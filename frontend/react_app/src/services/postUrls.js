import axios from "redaxios";

export const postUrls = (repoUrls, setFetchedRepos) => {
  axios
    .post("http://localhost:80/api/url/", {
      url: repoUrls,
    })
    .then((res) => {
      alert("Link upload success ✔", res);
      setFetchedRepos(res.data);
    })
    .catch((err) => {
      alert("Link upload error ✘", err);
    });
};
