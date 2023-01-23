from celery import shared_task
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

from .models import Repositories, Authors, Branches, Commits, Changes, Report, RepoLanguages
import numpy as np
import json
from django.core.mail import send_mail
from django.conf import settings
from git import Repo, exc
import zipfile
from django.core.exceptions import ObjectDoesNotExist
import ghlinguist as ghl
import os


@shared_task(bind=True)
def generate_basic_report(self, repo_name, merged_users, lng_to_chk):
    report = {"branches": []}
    repo_obj = Repositories.objects.filter(repo_name=repo_name).latest('id')
    urls = repo_obj.url.split(",")
    extensions_to_delete = []
    repo_lng = [val.get('languages') for val in RepoLanguages.objects.filter(repository=repo_obj).values('languages')]
    if sorted(repo_lng) != sorted(lng_to_chk):
        with open('api/extras/extensions.json', 'r') as j:
            contents = json.loads(j.read()).get('data')
        for lng in repo_lng:
            if lng not in lng_to_chk:
                for data in list(filter(lambda to_delete: to_delete['name'] == lng, contents)):
                    for d in data.get('extensions'):
                        extensions_to_delete.append(d.split('.')[-1])
                RepoLanguages.objects.filter(repository=repo_obj, languages=lng).delete()
    for url in urls:
        try:
            path = os.getcwd()
            Repo.clone_from(url, os.path.join(path, f"{repo_name}"))
            repo = Repo(os.path.join(path, f"{repo_name}"))
        except exc.GitError:
            if url == "zip":
                repo = Repo(f"./target/from_zip")
            else:
                repo = Repo(f"./target/from_zip/{repo_name}")
        report['repo_name'] = repo_obj.repo_name
        remote_refs = repo.remote().refs
        for mu in merged_users:
            Authors.objects.create(name=mu["new_name"], email=mu["new_email"], old_name=mu['old_name'],
                                   old_email=mu['old_email'],
                                   repository=repo_obj)
        for refs in remote_refs:
            refs.checkout()
            commits_list = list(repo.iter_commits())
            Branches.objects.create(name=refs.name.split('/')[1], commits_count=len(commits_list),
                                    repository=repo_obj)
            branch = Branches.objects.filter(name=refs.name.split('/')[1]).latest('id').name
            curr_branch = {"branch_name": branch, 'commits': [], 'authors': list(
                np.unique([Authors.objects.filter(old_email=author.author.email,
                                               repository=Repositories.objects.filter(repo_name=repo_name).latest(
                                                   'id')).latest('id').name for author in
                           reversed(commits_list)]))}
            # if extensions:
            #    f.write(f"File extensions: {extensions}\n")
            for commit in reversed(commits_list):
                if [key.split('.')[-1] for key in commit.stats.files] != extensions_to_delete:
                    commit_obj = Commits.objects.create(author=Authors.objects.filter(old_email=commit.author.email,
                                                                                   repository=Repositories.objects.filter
                                                                                   (repo_name=repo_name).latest(
                                                                                       'id')).latest('id'),
                                                        branch=Branches.objects.filter(
                                                            name=refs.name.split('/')[1]).latest('id'),
                                                        date=commit.committed_datetime.strftime("%Y-%m-%d"),
                                                        message=commit.message.replace('\n', ''))
                    for key in commit.stats.files:
                        if key.split('.')[-1] not in extensions_to_delete:
                            stats = commit.stats.files[f'{key}']
                            Changes.objects.create(commit=commit_obj, file_name=key,
                                                   insertions=stats['insertions'],
                                                   deletions=stats['deletions'], lines=stats['lines'])
                    changes = commit.stats.files
                    changes_filtered = [{"file_name": x, "changes": changes[x]} for x in changes
                                        if x.split('.')[-1] not in extensions_to_delete]
                    curr_branch['commits'].append({'author': Authors.objects.filter(old_email=commit.author.email,
                                                                                 repository=Repositories.objects.
                                                                                 filter(repo_name=repo_name).latest(
                                                                                     'id')).latest('id').name,
                                                   'branch': branch,
                                                   'date': commit.committed_datetime.strftime("%Y-%m-%d"),
                                                   'message': commit.message.replace('\n', ''),
                                                   'changed_files': changes_filtered})
            report["branches"].append(curr_branch)
        Report.objects.create(repo_name=repo_name, report=json.dumps(report, default=str))
        os.system(f"rm -rf {repo_name}")
    grafana_url = os.environ.get('GRAFANA_URL')
    branch_to_url = Branches.objects.filter(repository=repo_obj).values('name')[0].get('name')
    repo_url = f'{grafana_url}/d/yZQk88D4k/codestats?orgId=1&var-Repository={repo_name}' \
               f'&var-Iteration={repo_obj.iteration}&var-Branch={branch_to_url}'
    send_mail(
        f'Report for {repo_name}',
        f'Link for report {repo_url}',
        settings.DEFAULT_FROM_EMAIL,
        repo_obj.receivers.split(','),
        fail_silently=False,
    )
    return report


@shared_task(bind=True)
def handle_zip_save(self, file_obj, receivers):
    name = file_obj.name
    default_storage.save(name, ContentFile(file_obj.read()))
    with zipfile.ZipFile(name, "r") as zip_ref:
        zip_ref.extractall("./target/from_zip")
        names = [name for name in os.listdir("./target/from_zip")
                 if os.path.isdir(os.path.join("./target/from_zip", name))]
    repo_names = []
    try:
        if ".git" not in names:
            for name in names:
                tmp_names = [n for n in os.listdir(f"./target/from_zip/{name}")]
                if ".git" in tmp_names:
                    try:
                        iteration = Repositories.objects.filter(repo_name=name).latest('id').iteration + 1
                    except ObjectDoesNotExist:
                        iteration = 1
                    Repositories.objects.create(repo_name=name, receivers=",".join(receivers),
                                                url=name, iteration=iteration)
                    repo_names.append(name)
            return repo_names
        else:
            try:
                iteration = Repositories.objects.filter(repo_name=name.split(".")[0]).latest('id').iteration + 1
            except ObjectDoesNotExist:
                iteration = 1
            Repositories.objects.create(repo_name=name.split(".")[0], receivers=",".join(receivers),
                                        url='zip', iteration=iteration)
            return [name.split(".")[0]]
    except IndexError:
        to_return = "files"
        return [to_return]


@shared_task(bind=True)
def get_all_users_from_zip(self, repo_name):
    all_data = []
    for item in repo_name:
        model_item = Repositories.objects.filter(repo_name=item).latest('id')
        users = []
        if model_item.url == "zip":
            path = f"./target/from_zip/"
            repo = Repo(f"./target/from_zip/")
        else:
            path = f"./target/from_zip/{item}"
            repo = Repo(f"./target/from_zip/{item}")
        remote_refs = repo.remote().refs
        for refs in remote_refs:
            refs.checkout()
            commits_list = list(repo.iter_commits())
            for author in reversed(commits_list):
                users.append({"name": author.author.name, "email": author.author.email})
        for lng in ghl.linguist(path):
            if float(lng[1]) > 0:
                RepoLanguages.objects.create(languages=lng[0], percentage=lng[1],
                                             repository=Repositories.objects.filter(repo_name=item).
                                             latest('id'))
        all_data.append({"repo_name": item, "users": list({v['email']: v for v in users}.values()),
                         'languages': [l[0] for l in ghl.linguist(path)]})
    return {"data": all_data}
