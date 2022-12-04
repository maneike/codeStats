import axios from "redaxios";

export const postUrls = (
  repoUrls,
  receivers,
  setFetchedRepos,
  setLoading,
  merged
) => {
  axios
    .post("http://localhost:80/api/url/", {
      url: repoUrls,
      receivers,
    })
    .then((res) => {
      alert("Link upload success ✔", res);
      setFetchedRepos(res.data);
    })
    .catch((err) => {
      alert("Link upload error ✘", err);
    })
    .finally(() => setLoading(false));
};
