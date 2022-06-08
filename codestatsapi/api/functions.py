import os
from django.db import IntegrityError
from git import Repo
from pathlib import Path
from .models import Repositories, Authors, Branches, Commits
import numpy as np


def generate_basic_report(url):
    report = {}
    repo_name = url.split('.git')[0].split('/')[-1]
    path = os.getcwd()
    repo = Repo.clone_from(url, os.path.join(path, f"{repo_name}"))
    Repositories.objects.create(repo_name=repo_name)
    report['repo_name'] = Repositories.objects.latest('id').repo_name
    remote_refs = repo.remote().refs
    for refs in remote_refs:
        refs.checkout()
        extensions = set([str(i).split('.')[-1] for i in list(Path(f"./{repo_name}").rglob("*.*"))])
        commits_list = list(repo.iter_commits())
        Branches.objects.create(name=refs.name.split('/')[1], commits_count=len(commits_list),
                                repository=Repositories.objects.latest('id'))
        branch = Branches.objects.latest('id').name
        report[f'{branch}'] = {'commits': []}
        for author in reversed(commits_list):
            try:
                Authors.objects.create(name=author.author.name, email=author.author.email,
                                       repository=Repositories.objects.latest('id'))
            except IntegrityError:
                pass
        report[f'{branch}']['authors'] = list(np.unique([author.author.name for author in reversed(commits_list)]))
        # if extensions:
        #    f.write(f"File extensions: {extensions}\n")
        for commit in reversed(commits_list):
            Commits.objects.create(author=Authors.objects.get(email=commit.author.email),
                                   branch=Branches.objects.latest('id'),
                                   date=commit.committed_datetime,
                                   message=commit.message.replace('\n', ''))
            report[f'{branch}']['commits'].append({'author': Authors.objects.get(email=commit.author.email).name,
                                                   'branch': Branches.objects.latest('id').name,
                                                   'date': commit.committed_datetime,
                                                   'message': commit.message.replace('\n', ''),
                                                   'changes': commit.stats.files})
    os.system(f"rm -rf {repo_name}")
    return report
