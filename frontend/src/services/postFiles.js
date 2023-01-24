import axios from "redaxios";

export const postFiles = (
  receivers,
  selectedFile,
  formData,
  setFetchedRepos,
  setLoading
) => {
  formData.append("file", selectedFile);
  formData.append(
    "receivers",
    new Blob([JSON.stringify(receivers)], {
      type: "application/json",
    })
  );
  axios
    .post("http://localhost:80/api/zip/", formData)
    .then((res) => {
      alert("File upload success ✔", res);
      setFetchedRepos(res.data);
      setLoading(false);
    })
    .catch((err) => {
      alert("File upload error ✘", err);
      setLoading(false);
      throw new Error(err);
    })
    .finally(() => setLoading(false));
};
