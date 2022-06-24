import axios from "redaxios";

export const getRepoReport = (repo) => {
  axios
    .get(`http://localhost:80/api/report/${repo.repo_name}/`)
    .then((res) => {
      alert("Repositories fetch success, check console ✔", res);
      console.log(res);
    })
    .catch((err) => {
        alert("Repositories upload error, check console ✘", err);
        console.log(res);
    });
};
