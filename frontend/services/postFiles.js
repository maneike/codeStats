import axios from "redaxios";

export const postFiles = (selectedFile, formData) => {
  formData.append("file", selectedFile);
  axios
    .post("http://localhost:8000/api/zip/", formData)
    .then((res) => {
      alert("File Upload success", res);
    })
    .catch((err) => alert("File Upload Error", err));
};
