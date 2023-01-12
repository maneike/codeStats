import axios from "redaxios";

export const postMergedUsers = (repo, setLoading, selectedLanguages) => {
  axios
    .post("http://localhost:80/api/merged/", {
      repo_name: repo.repo_name,
      merged_users: repo.merged_users,
      languages: selectedLanguages,
    })
    .then((res) => {
      alert("Repositories upload success ✔", res);
    })
    .catch((err) => {
      alert("Repositories upload error ✘", err);
    })
    .finally(() => setLoading(false));
};
