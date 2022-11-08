from celery import shared_task
import os
from git import Repo, exc
from .models import Repositories, Authors, Branches, Commits, Changes, Report
from django.core.exceptions import ObjectDoesNotExist
import numpy as np
import json
from django.core.mail import send_mail
from django.conf import settings


@shared_task(bind=True)
def generate_basic_report(self, repo_name, merged_users):
    report = {"branches": []}
    try:
        path = os.getcwd()
        repo = Repo(os.path.join(path, f"{repo_name}"))
    except exc.GitError:
        if repo_name == "files":
            repo = Repo(f"./from_zip")
        else:
            repo = Repo(f"./from_zip/{repo_name}")
    report['repo_name'] = Repositories.objects.filter(repo_name=repo_name).latest('id')[0]['repo_name']
    remote_refs = repo.remote().refs
    for mu in merged_users:
        Authors.objects.create(name=mu["new_name"], email=mu["new_email"], old_name=mu['old_name'],
                               old_email=mu['old_email'],
                               repository=Repositories.objects.filter(repo_name=repo_name).latest('id')[0]['repo_name'])
    for refs in remote_refs:
        refs.checkout()
        # extensions = set([str(i).split('.')[-1] for i in list(Path(f"./{repo_name}").rglob("*.*"))])
        commits_list = list(repo.iter_commits())
        Branches.objects.create(name=refs.name.split('/')[1], commits_count=len(commits_list),
                                repository=Repositories.objects.filter(repo_name=repo_name).
                                latest('id')[0]['repo_name'])
        branch = Branches.objects.latest('id').name
        curr_branch = {"branch_name": branch, 'commits': [], 'authors': list(
            np.unique([Authors.objects.get(old_email=author.author.email,
                                           repository=Repositories.objects.filter(repo_name=repo_name).
                                           latest('id')[0]['repo_name']).name for author in
                       reversed(commits_list)]))}
        # if extensions:
        #    f.write(f"File extensions: {extensions}\n")
        for commit in reversed(commits_list):
            Commits.objects.create(author=Authors.objects.get(old_email=commit.author.email,
                                                              repository=Repositories.objects.filter
                                                              (repo_name=repo_name).latest('id')[0]['repo_name']),
                                   branch=Branches.objects.latest('id'),
                                   date=commit.committed_datetime,
                                   message=commit.message.replace('\n', ''))
            for key in commit.stats.files:
                stats = commit.stats.files[f'{key}']
                Changes.objects.create(commit=Commits.objects.latest('id'), file_name=key,
                                       insertions=stats['insertions'],
                                       deletions=stats['deletions'], lines=stats['lines'])
            changes = commit.stats.files
            changes_filtered = [{"file_name": x, "changes": changes[x]} for x in changes]
            curr_branch['commits'].append({'author': Authors.objects.get(old_email=commit.author.email,
                                                                         repository=Repositories.objects.
                                                                         filter(repo_name=repo_name).latest('id')
                                                                         [0]['repo_name']).name,
                                           'branch': Branches.objects.latest('id').name,
                                           'date': commit.committed_datetime,
                                           'message': commit.message.replace('\n', ''),
                                           'changed_files': changes_filtered})
        report["branches"].append(curr_branch)
    Report.objects.create(repo_name=repo_name, report=json.dumps(report, default=str))
    os.system(f"rm -rf {repo_name}")
    report_url = f'http://localhost:3001/d/vNBjJo3nz/new-dashboard?orgId=1&var-Repository={repo_name}'
    send_mail(
        f'Report for {repo_name}',
        f'Link for report {report_url}',
        settings.DEFAULT_FROM_EMAIL,
        Repositories.objects.filter(repo_name='PRA2021-PRA2022').values()[0]['receivers'].split(','),
        fail_silently=False,
    )
    return report
