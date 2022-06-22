import os
from git import Repo, exc
from .models import Repositories, Authors, Branches, Commits, Changes
from django.core.exceptions import ObjectDoesNotExist
import numpy as np
import zipfile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


def generate_basic_report(repo_name, merged_users):
    report = {"branches": []}
    path = os.getcwd()
    repo = Repo(os.path.join(path, f"{repo_name}"))
    try:
        Repositories.objects.get(repo_name=repo_name).delete()
        Repositories.objects.create(repo_name=repo_name)
    except ObjectDoesNotExist:
        Repositories.objects.create(repo_name=repo_name)
    report['repo_name'] = Repositories.objects.latest('id').repo_name
    remote_refs = repo.remote().refs
    for mu in merged_users:
        Authors.objects.create(name=mu["new_name"], email=mu["new_email"], old_name=mu['old_name'],
                               old_email=mu['old_email'],
                               repository=Repositories.objects.latest('id'))
    for refs in remote_refs:
        refs.checkout()
        # extensions = set([str(i).split('.')[-1] for i in list(Path(f"./{repo_name}").rglob("*.*"))])
        commits_list = list(repo.iter_commits())
        Branches.objects.create(name=refs.name.split('/')[1], commits_count=len(commits_list),
                                repository=Repositories.objects.latest('id'))
        branch = Branches.objects.latest('id').name
        curr_branch = {"branch_name": branch, 'commits': [], 'authors': list(
            np.unique([Authors.objects.get(old_email=author.author.email).name for author in reversed(commits_list)]))}
        # if extensions:
        #    f.write(f"File extensions: {extensions}\n")
        for commit in reversed(commits_list):
            Commits.objects.create(author=Authors.objects.get(old_email=commit.author.email),
                                   branch=Branches.objects.latest('id'),
                                   date=commit.committed_datetime,
                                   message=commit.message.replace('\n', ''))
            for key in commit.stats.files:
                stats = commit.stats.files[f'{key}']
                Changes.objects.create(commit=Commits.objects.latest('id'), file_name=key,
                                       insertions=stats['insertions'],
                                       deletions=stats['deletions'], lines=stats['lines'])
            curr_branch['commits'].append({'author': Authors.objects.get(old_email=commit.author.email).name,
                                           'branch': Branches.objects.latest('id').name,
                                           'date': commit.committed_datetime,
                                           'message': commit.message.replace('\n', ''),
                                           'changes': commit.stats.files})
        report["branches"].append(curr_branch)
    os.system(f"rm -rf {repo_name}")
    return report


def get_all_users(url):
    users = []
    repo_name = url.split('.git')[0].split('/')[-1]
    path = os.getcwd()
    try:
        repo = Repo.clone_from(url, os.path.join(path, f"{repo_name}"))
    except exc.GitError:
        os.system(f"rm -rf {repo_name}")
        repo = Repo.clone_from(url, os.path.join(path, f"{repo_name}"))
    remote_refs = repo.remote().refs
    for refs in remote_refs:
        refs.checkout()
        commits_list = list(repo.iter_commits())
        for author in reversed(commits_list):
            users.append({"name": author.author.name, "email": author.author.email})
    return {"repo_name": repo_name, "users": list({v['email']: v for v in users}.values())}


def handle_zip_save(file_obj):
    name = file_obj.name
    default_storage.save(name, ContentFile(file_obj.read()))
    with zipfile.ZipFile(name, "r") as zip_ref:
        zip_ref.extractall("./from_zip")
        names = [info.filename for info in zip_ref.infolist() if info.is_dir()]
    try:
        if len(names) == 1:
            to_return = names[0]
        else:
            to_return = "files"
    except IndexError:
        to_return = "files"
    return to_return


def get_all_users_from_zip(repo_name):
    users = []
    if repo_name == "files":
        repo = Repo(f"./from_zip")
    else:
        repo = Repo(f"./from_zip/{repo_name}")
    remote_refs = repo.remote().refs
    for refs in remote_refs:
        refs.checkout()
        commits_list = list(repo.iter_commits())
        for author in reversed(commits_list):
            users.append({"name": author.author.name, "email": author.author.email})
    new_repo_name = repo.remote().url.split('.git')[0].split('/')[-1]
    return {"repo_name": new_repo_name, "users": list({v['email']: v for v in users}.values())}
