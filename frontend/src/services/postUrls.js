import axios from "redaxios";

export const postUrls = (
  receivers,
  mergedUrls,
  setFetchedRepos,
  setLoading
) => {
  axios
    .post("http://localhost:80/api/url/", {
      receivers: receivers,
      mergedUrls: mergedUrls,
    })
    .then((res) => {
      alert("Link upload success ✔", res);
      setFetchedRepos(res.data);
      setLoading(false);
    })
    .catch((err) => {
      alert("Link upload error ✘");
      setLoading(false);
      throw new Error(err);
    });
};
