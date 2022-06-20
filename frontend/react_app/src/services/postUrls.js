import axios from "redaxios";

export const postUrls = (repoUrl) => {
  axios
    .post("http://localhost:8000/api/url/", { url: repoUrl })
    .then((res) => {
      alert("Link upload success ✔", res);
    })
    .catch((err) => {
      alert("Link upload error ✘", err);
    });
};
