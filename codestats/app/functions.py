import os
from git import Repo


def generate_basic_report(url):
    repo_name = url.split('.git')[0].split('/')[-1]
    info = []
    try:
        path = os.getcwd()
        f = open(f"{repo_name}.txt", "w")
        repo = Repo.clone_from(url, os.path.join(path, f"{repo_name}"))
        f.write(f"{repo_name}\n")
        commits_list = list(repo.iter_commits())
        f.write(f"Commits count: {len(commits_list)}\n")
        f.write("------------------------------------------\n")
        for commit in reversed(commits_list):
            commit_msg_before = commit.message.replace('\n', '')
            commit_msg = f"Commit msg: {commit_msg_before}\n"
            commit_date = f"Date: {str(commit.committed_datetime)}\n"
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
