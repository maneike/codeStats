import axios from "redaxios";

export const postUrls = (repoUrl) => {
  axios
    .post("http://localhost:8000/api/url/", { url: repoUrl })
    .then((res) => {
      alert("File upload success ✔", res);
    })
    .catch((err) => {
      alert("File upload error ✘", err);
    });
};
