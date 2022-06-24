import axios from "redaxios";

export const postUrls = (repoUrl, setFetchedRepos) => {
  axios
    .post("http://localhost:80/api/url/", {
      url: [repoUrl],
    })
    .then((res) => {
      alert("Link upload success ✔", res);
      setFetchedRepos(res.data);
    })
    .catch((err) => {
      alert("Link upload error ✘", err);
    });
};
