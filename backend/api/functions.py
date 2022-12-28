import os
from git import Repo, exc
import zipfile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
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
        if u.get('new').get('name') == u.get('old').get('name'):
            merged = False
        else:
            merged = True
        repo_object = Repositories.objects.update_or_create(repo_name=repo_name).latest('id')[0]
        repo_object.url = repo_object.url + f',{u.get("old").get("url")}'
        Repositories.objects.filter(repo_name=repo_name).update(url = repo_object.url + f',{u.get("old").get("url")}')
        os.system(f"rm -rf /code/{u.get('old').get('name')}")
        path = os.getcwd()
        repo = Repo.clone_from(u.get('old').get('url'), os.path.join(path, f"{u.get('old').get('name')}"))
        for lng in ghl.linguist(f"./{u.get('old').get('name')}"):
            if float(lng[1]) > 0:
                RepoLanguages.objects.update_or_create(languages=lng[0], percentage=lng[1], repository=repo_object)
        remote_refs = repo.remote().refs
        for refs in remote_refs:
            refs.checkout()
            commits_list = list(repo.iter_commits())
            for author in reversed(commits_list):
                users.append({"name": author.author.name, "email": author.author.email})
        if merged:
            for i in all_data:
                if i.get("repo_name") == repo_name: i.get('users').extend(list({v['email']: v for v in users}.values()))
        else:
            all_data.append({"repo_name": repo_name, "users": list({v['email']: v for v in users}.values())})
    return {"data": all_data}


def handle_first_url(first_data, receivers):
    users = []
    if first_data.get('new').get('name') == first_data.get('old').get('name'):
        repo_name = first_data.get('new').get('name')
    else:
        repo_name = first_data.get('new').get('name')
    os.system(f"rm -rf /code/{first_data.get('old').get('name')}")
    repo_model = Repositories.objects.update_or_create(repo_name=repo_name, receivers=",".join(receivers), url=first_data.get('old').get('url'))[0]
    path = os.getcwd()
    try:
        repo = Repo.clone_from(first_data.get('old').get('url'), os.path.join(path, f"{repo_name}"))
    except exc.GitError:
        repo = Repo.clone_from(first_data.get('old').get('url'), os.path.join(path, f"{repo_name}"))
    remote_refs = repo.remote().refs
    for refs in remote_refs:
        refs.checkout()
        commits_list = list(repo.iter_commits())
        for author in reversed(commits_list):
            users.append({"name": author.author.name, "email": author.author.email})
    for lng in ghl.linguist(f"./{first_data.get('old').get('name')}"):
        if float(lng[1]) > 0:
            RepoLanguages.objects.update_or_create(languages=lng[0], percentage=lng[1], repository=repo_model)
    return {"repo_name": repo_name, "users": list({v['email']: v for v in users}.values())}

def handle_zip_save(file_obj):
    name = file_obj.name
    default_storage.save(name, ContentFile(file_obj.read()))
    with zipfile.ZipFile(name, "r") as zip_ref:
        zip_ref.extractall("./from_zip")
        names = [name for name in os.listdir("./from_zip") if os.path.isdir(os.path.join("./from_zip", name))]
    try:
        if ".git" not in names:
            for name in names:
                tmp_names = [n for n in os.listdir(f"./from_zip/{name}")]
                if ".git" in tmp_names:
                    return name
                else:
                    return tmp_names
        else:
            to_return = "files"
            return to_return
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
    return {"repo_name": repo_name, "users": list({v['email']: v for v in users}.values())}
