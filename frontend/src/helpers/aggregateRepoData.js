const aggregateRepoData = (repo) => {
  const aggregatedRepo = {
    repo_name: repo.repo_name,
    merged_users: repo.users?.map((user) => ({
      old_name: user.name,
      old_email: user.email,
      new_name: user.name,
      new_email: user.email,
    })),
    languages: repo.languages,
  };

  return aggregatedRepo;
};

export default aggregateRepoData;
