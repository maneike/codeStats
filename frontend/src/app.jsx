import { useEffect, useState } from "preact/hooks";
import "./index.css";

import NavBar from "./components/NavBar";
import UrlsForm from "./components/UrlsForm";
import UploadForm from "./components/UploadForm";
import AggregatedReposForm from "./components/AggregatedReposForm/AggregatedReposForm";
import ReceiversTitle from "./components/ReceiversTitle/ReceiversTitle";

import aggregateRepoData from "./helpers/aggregateRepoData";

export function App() {
  const [fetchedRepos, setFetchedRepos] = useState(null);
  const [aggregatedRepos, setAggregatedRepos] = useState(fetchedRepos ?? []);
  const [isLoading, setLoading] = useState(false);
  const [receivers, setReceivers] = useState("");

  useEffect(() => {
    const temp = [];
    fetchedRepos?.data?.map((repo) => {
      temp.push(aggregateRepoData(repo));
    });
    setAggregatedRepos(temp);
  }, [fetchedRepos]);

  const hideForm = Boolean(fetchedRepos);
  const displayReceiver = Boolean(aggregatedRepos);

  return (
    <>
      <NavBar />
      {!hideForm && (
        <>
          <UrlsForm
            receivers={receivers}
            setReceivers={setReceivers}
            isLoading={isLoading}
            setLoading={setLoading}
            setFetchedRepos={setFetchedRepos}
          />
          <UploadForm
            isLoading={isLoading}
            setLoading={setLoading}
            setFetchedRepos={setFetchedRepos}
          />
        </>
      )}
      {displayReceiver && hideForm && <ReceiversTitle receivers={receivers} />}
      {aggregatedRepos.length > 0 && (
        <AggregatedReposForm
          isLoading={isLoading}
          setLoading={setLoading}
          aggregatedRepos={aggregatedRepos}
          setAggregatedRepos={setAggregatedRepos}
        />
      )}
    </>
  );
}
