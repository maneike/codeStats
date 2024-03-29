import os
from git import Repo, exc
from .models import Repositories, RepoLanguages
from django.core.exceptions import ObjectDoesNotExist
import ghlinguist as ghl


def get_all_users(urls, receivers):
    first_data = handle_first_url(urls[0], receivers)
    all_data = [first_data]
    if len(urls) == 1:
        return {"data": all_data}
    for u in urls[1:]:
        users = []
        repo_name = u.get('new').get('name')
        if u.get('new').get('name') == u.get('old').get('name') and urls[urls.index(u)-1].get('new').get('name') != u.get('new').get('name'):
            merged = False
        else:
            merged = True
        if merged:
            repo_object = Repositories.objects.filter(repo_name=repo_name).latest('iteration')
            repo_object.url = repo_object.url + f',{u.get("old").get("url")}'
            repo_object.save()
        else:
            try:
                iteration = Repositories.objects.filter(repo_name=repo_name).latest('iteration').iteration + 1
            except ObjectDoesNotExist:
                iteration = 1
            repo_object = Repositories.objects.create(repo_name=repo_name, receivers=",".join(receivers),
                                                      url=u.get('old').get('url'), iteration=iteration)
        os.system(f"rm -rf /code/{u.get('old').get('name')}")
        path = os.getcwd()
        repo = Repo.clone_from(u.get('old').get('url'), os.path.join(path, f"{u.get('old').get('name')}"))
        try:
            for lng in ghl.linguist(f"./{u.get('old').get('name')}"):
                if float(lng[1]) > 0:
                    RepoLanguages.objects.create(languages=lng[0], percentage=lng[1], repository=repo_object)
        except TypeError:
            return {'error': 'Failed to get languages used in this repo'}
        remote_refs = repo.remote().refs
        for refs in remote_refs:
            refs.checkout()
            commits_list = list(repo.iter_commits())
            for author in reversed(commits_list):
                users.append({"name": author.author.name, "email": author.author.email})
        if merged:
            for i in all_data:
                if i.get("repo_name") == repo_name:
                    i.get('users').extend(list({v['email']: v for v in users}.values()))
                    i.get('languages').extend([l[0] for l in ghl.linguist(f"./{u.get('old').get('name')}")])
                    i['languages'] = list(set(i.get('languages')))
        else:
            all_data.append({"repo_name": repo_name, "users": list({v['email']: v for v in users}.values()),
                             'languages': [l[0] for l in ghl.linguist(f"./{u.get('old').get('name')}")]})
    return {"data": all_data}


def handle_first_url(first_data, receivers):
    users = []
    if first_data.get('new').get('name') == first_data.get('old').get('name'):
        repo_name = first_data.get('new').get('name')
    else:
        repo_name = first_data.get('new').get('name')
    os.system(f"rm -rf /code/{first_data.get('old').get('name')}")
    try:
        iteration = Repositories.objects.filter(repo_name=repo_name).latest('id').iteration + 1
    except ObjectDoesNotExist:
        iteration = 1
    repo_model = Repositories.objects.create(repo_name=repo_name, receivers=",".join(receivers),
                                             url=first_data.get('old').get('url'), iteration=iteration)
    path = os.getcwd()
    try:
        repo = Repo.clone_from(first_data.get('old').get('url'), os.path.join(path, f"{first_data.get('old').get('name')}"))
    except exc.GitCommandError:
        return {'error': 'Requested repository is private or does not exist.'}
    remote_refs = repo.remote().refs
    for refs in remote_refs:
        refs.checkout()
        commits_list = list(repo.iter_commits())
        for author in reversed(commits_list):
            users.append({"name": author.author.name, "email": author.author.email})
    try:
        for lng in ghl.linguist(f"./{first_data.get('old').get('name')}"):
            if float(lng[1]) > 0:
                RepoLanguages.objects.create(languages=lng[0], percentage=lng[1], repository=repo_model)
    except TypeError:
        return {'error': 'Failed to get languages used in this repo'}
    return {"repo_name": repo_name, "users": list({v['email']: v for v in users}.values()),
            'languages': [l[0] for l in ghl.linguist(f"./{first_data.get('old').get('name')}")]}



