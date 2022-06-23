import os
from git import Repo, exc
import zipfile
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile


def get_all_users(url):
    all_data = []
    for u in url:
        users = []
        repo_name = u.split('.git')[0].split('/')[-1]
        path = os.getcwd()
        try:
            repo = Repo.clone_from(u, os.path.join(path, f"{repo_name}"))
        except exc.GitError:
            os.system(f"rm -rf {repo_name}")
            repo = Repo.clone_from(u, os.path.join(path, f"{repo_name}"))
        remote_refs = repo.remote().refs
        for refs in remote_refs:
            refs.checkout()
            commits_list = list(repo.iter_commits())
            for author in reversed(commits_list):
                users.append({"name": author.author.name, "email": author.author.email})
        all_data = {"repo_name": repo_name, "users": list({v['email']: v for v in users}.values())}
    return {"data": all_data}


def handle_zip_save(file_obj):
    name = file_obj.name
    default_storage.save(name, ContentFile(file_obj.read()))
    with zipfile.ZipFile(name, "r") as zip_ref:
        zip_ref.extractall("./from_zip")
        names = [name for name in os.listdir("./from_zip") if os.path.isdir(os.path.join("./from_zip", name))]
    try:
        if len(names) == 1 and names[0] != ".git":
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
    return {"repo_name": repo_name, "users": list({v['email']: v for v in users}.values())}
