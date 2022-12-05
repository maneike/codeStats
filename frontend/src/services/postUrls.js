import axios from "redaxios";

export const postUrls = (
  setFetchedRepos,
  setLoading,
  receivers,
  mergedRepos
) => {
  axios
    .post("http://localhost:80/api/url/", {
      receivers: receivers,
      mergedRepos: mergedRepos,
    })
    .then((res) => {
      alert("Link upload success ✔", res);
      setFetchedRepos(res.data);
    })
    .catch((err) => {
      alert("Link upload error ✘");
      throw new Error(err);
    })
    .finally(() => setLoading(false));
};
