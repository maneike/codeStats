import os
from git import Repo
from pathlib import Path


def generate_basic_report(url):
    repo_name = url.split('.git')[0].split('/')[-1]
    info = []
    try:
        path = os.getcwd()
        f = open(f"{repo_name}.txt", "w")
        repo = Repo.clone_from(url, os.path.join(path, f"{repo_name}"))
        f.write(f"{repo_name}\n")
        remote_refs = repo.remote().refs
        for refs in remote_refs:
            f.write(f"{refs.name.split('/')[1]}\n")
            refs.checkout()
            print(list(Path(f"./{repo_name}").rglob("*.*")))
            extensions = set([str(i).split('.')[-1] for i in list(Path(f"./{repo_name}").rglob("*.*"))])
            commits_list = list(repo.iter_commits())
            authors = ", ".join(set(author.author.email for author in commits_list))
            f.write(f"Autorzy: {authors}\n")
            f.write(f"Commits count: {len(commits_list)}\n")
            if extensions:
                f.write(f"File extensions: {extensions}\n")
            f.write("------------------------------------------\n")
            for commit in reversed(commits_list):
                commit_msg_before = commit.message.replace('\n', '')
                commit_msg = f"Commit msg: {commit_msg_before}\n"
                commit_date = f"Date: {commit.committed_datetime.strftime('%d/%m/%Y, %H:%M:%S')}\n"
                commit_author = f"Author: {commit.author.name}\n"
                commit_author_mail = f"Email: {commit.author.email}\n"
                info.append([commit_msg, commit_date, commit_author,
                             commit_author_mail, "----------------------------------\n"])
        for i in info:
            f.writelines(i)
        os.system(f"rm -rf {repo_name}")
    except FileNotFoundError:
        os.system(f'touch {repo_name}.txt')
        generate_basic_report(url)
    return repo_name
