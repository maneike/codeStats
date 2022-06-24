import axios from "redaxios";

export const getRepoReport = (repo, setRepoReport) => {
  axios
    .get(`http://localhost:80/api/report/${repo.repo_name}/`)
    .then((res) => {
      console.log(res);
      alert("Repositories fetch success ✔", res);
    })
    .catch((err) => {
      alert("Repositories upload error ✘", err);
    });
};
