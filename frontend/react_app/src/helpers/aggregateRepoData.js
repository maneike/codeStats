const aggregateRepoData = (repos) => {
  const newRepos = [];
  typeof repos == Array
    ? repos?.map((repo) => {
        newRepos.push({
          repo_name: repo.repo_name,
          merged_users: repo.users?.map((user) => ({
            old_name: user.name,
            old_email: user.email,
            new_name: user.name,
            new_email: user.email,
          })),
        });
      })
    : newRepos.push({
        repo_name: repos.repo_name,
        merged_users: repos.users?.map((user) => ({
          old_name: user.name,
          old_email: user.email,
          new_name: user.name,
          new_email: user.email,
        })),
      });

  if (newRepos.length > 1) return newRepos;
  else {
    return newRepos[0];
  }
};

export default aggregateRepoData;
