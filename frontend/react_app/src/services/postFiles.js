import axios from "redaxios";

export const postFiles = (selectedFile, formData, setFetchedRepos) => {
  formData.append("file", selectedFile);
  axios
    .post("http://localhost:80/api/zip/", formData)
    .then((res) => {
      alert("File upload success ✔", res);
      setFetchedRepos(res.data);
    })
    .catch((err) => alert("File upload error ✘", err));
};
