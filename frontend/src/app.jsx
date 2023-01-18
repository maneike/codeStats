import { useEffect, useState } from "preact/hooks";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import "./index.css";

import DropdownSelect from "./components/DropdownSelect";
import FileUploader from "./components/FileUploader";
import Li from "./components/Li";
import Line from "./components/Line";
import NavBar from "./components/NavBar";
import Ul from "./components/Ul";
import UrlsToMergeList from "./components/UrlsToMergeList";

import aggregateRepoData from "./helpers/aggregateRepoData";
import { regex } from "./helpers/extractRepoNameFromUrl";

import { postFiles } from "./services/postFiles";
import { postUrls } from "./services/postUrls";
import { postMergedUsers } from "./services/postMergedUsers";

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fetchedRepos, setFetchedRepos] = useState(null);
  const [aggregatedRepos, setAggregatedRepos] = useState(fetchedRepos ?? []);
  const [isLoading, setLoading] = useState(false);
  const [receivers, setReceivers] = useState("");
  const [repoUrlsToMerge, setRepoUrlsToMerge] = useState([]);
  const [mergedUrls, setMergedUrls] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    const temp = [];
    fetchedRepos?.data?.map((repo) => {
      temp.push(aggregateRepoData(repo));
    });
    setAggregatedRepos(temp);
  }, [fetchedRepos]);

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    selectedFile &&
      postFiles(selectedFile, formData, setFetchedRepos, setLoading);
  };

  const submitUrl = (e) => {
    e.preventDefault();

    receivers && mergedUrls && setLoading(true);

    !receivers && alert("Please provide an email ✘");
    !mergedUrls && alert("Please provide the urls (ending with .git) ✘");

    mergedUrls &&
      receivers &&
      postUrls(
        receivers.split(",").map((item) => item.trim()),
        mergedUrls,
        setFetchedRepos,
        setLoading
      );
  };

  const submitRepoForm = (e, repoId) => {
    e.preventDefault();
    setLoading(true);
    aggregatedRepos != [] &&
      postMergedUsers(aggregatedRepos[repoId], setLoading, selectedLanguages);

    setSelectedLanguages([]);
  };

  const hideForm = fetchedRepos ? true : false;
  const displayReceiver = aggregatedRepos ? true : false;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      event.target.value.split(",").map((url) => {
        setRepoUrlsToMerge((repoUrlsToMerge) => [
          ...repoUrlsToMerge,
          url.trim(),
        ]);

        const repoName = url.match(/\/([^/]+)\.git$/)[1];

        setMergedUrls((mergedUrls) => [
          ...mergedUrls,
          {
            old: {
              name: repoName,
              url: url.trim(),
            },
            new: {
              name: repoName,
              url: url.trim(),
            },
          },
        ]);
      });
    }
  };

  const confirmUrls = (e) => {
    e.preventDefault();
    e.target.value.split(",").map((url) => {
      setRepoUrlsToMerge((repoUrlsToMerge) => [...repoUrlsToMerge, url.trim()]);

      const repoName = regex.exec(url)[5].replace(".git", "").trim();

      setMergedUrls((mergedUrls) => [
        ...mergedUrls,
        {
          old: {
            name: repoName,
            url: url.trim(),
          },
          new: {
            name: repoName,
            url: url.trim(),
          },
        },
      ]);
    });
  };

  return (
    <>
      <NavBar />
      {!hideForm && (
        <>
          <form>
            <InputsWrapper>
              <TextAreaReceivers
                placeholder="Enter email(s) to send report to"
                value={receivers}
                onChange={(e) => setReceivers(e.target.value)}
              />
              <Line />
              <TextAreaReceivers
                placeholder="Paste the repo URLs (with .git at the end) and submit them with enter"
                type="text"
                onKeyDown={handleKeyDown}
                // onChange={(e) => setRepoUrlsToMerge(e.target.value)}
              />
              {/* {mergedUrls.length === 0 && (
                <SubmitButton onClick={(e) => confirmUrls(e)}>
                  Confirm
                </SubmitButton>
              )} */}
              {repoUrlsToMerge && (
                <UrlsToMergeList
                  repoUrlsToMerge={repoUrlsToMerge}
                  mergedUrls={mergedUrls}
                  setMergedUrls={setMergedUrls}
                  value={mergedUrls}
                  onChange={(e) => setMergedUrls(e.target.value)}
                />
              )}
              <SubmitButton
                type="submit"
                disabled={isLoading || !receivers || !mergedUrls}
                onClick={submitUrl}
              >
                Submit
              </SubmitButton>
            </InputsWrapper>
            {isLoading && (
              <Blackout>
                <SpinnerContainer>
                  <Spinner></Spinner>
                </SpinnerContainer>
              </Blackout>
            )}
          </form>
          <form>
            <InputsWrapper>
              <FileUploader
                onFileSelectSuccess={(file) => setSelectedFile(file)}
                onFileSelectError={({ error }) => alert(error)}
              />
              <SubmitButton disabled={isLoading} onClick={submitForm}>
                Submit
              </SubmitButton>
            </InputsWrapper>
          </form>
        </>
      )}
      {displayReceiver && hideForm && (
        <ReceiversTitle>
          Your report will be sent to: {receivers}
        </ReceiversTitle>
      )}
      <form>
        {aggregatedRepos?.map((repo, repoId) => {
          {
            return (
              repo.merged_users && (
                <InputsWrapper>
                  <RepoTitle>{repo.repo_name}</RepoTitle>
                  {repo?.merged_users.map((user, userId) => {
                    return (
                      user && (
                        <>
                          <Ul>
                            <Li>
                              <DropdownSelect
                                onChange={(e) => {
                                  aggregatedRepos[repoId].merged_users[
                                    userId
                                  ].new_name = e.target.value;
                                  setAggregatedRepos([...aggregatedRepos]);
                                }}
                              >
                                {repo.merged_users.map(
                                  (selectUser, selectUserId) => (
                                    <option
                                      selected={userId === selectUserId}
                                      value={selectUser.old_name}
                                    >
                                      {selectUser.old_name}
                                    </option>
                                  )
                                )}
                              </DropdownSelect>

                              <DropdownSelect
                                onChange={(e) => {
                                  aggregatedRepos[repoId].merged_users[
                                    userId
                                  ].new_email = e.target.value;
                                  setAggregatedRepos([...aggregatedRepos]);
                                }}
                              >
                                {repo.merged_users.map(
                                  (selectUser, selectUserId) => (
                                    <option
                                      selected={userId === selectUserId}
                                      value={selectUser.old_email}
                                    >
                                      {selectUser.old_email}
                                    </option>
                                  )
                                )}
                              </DropdownSelect>
                            </Li>
                          </Ul>
                        </>
                      )
                    );
                  })}
                  <RepoTitle>Pick languages to include in the report</RepoTitle>
                  <LanguagesDiv>
                    {repo.languages.map((language) => (
                      <div>
                        <Checkbox
                          type="checkbox"
                          id={language}
                          value={language}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLanguages((selectedLanguages) => [
                                ...selectedLanguages,
                                e.target.value,
                              ]);
                            } else {
                              setSelectedLanguages((selectedLanguages) =>
                                selectedLanguages.filter(
                                  (language) => language !== e.target.value
                                )
                              );
                            }
                          }}
                        >
                          {language}
                        </Checkbox>
                        <label for={language}>{language}</label>
                      </div>
                    ))}
                  </LanguagesDiv>
                  <SubmitButton
                    disabled={isLoading}
                    onClick={(e) => submitRepoForm(e, repoId)}
                  >
                    Submit
                  </SubmitButton>
                </InputsWrapper>
              )
            );
          }
        })}
      </form>
    </>
  );
}

const Blackout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid lightgreen;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.8s linear infinite;
`;

const Checkbox = styled.input`
  accent-color: lightgreen;
`;

const LanguagesDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  padding: 0.5rem;
  gap: 0.1rem;
  border-radius: 0.25rem;
  background-color: #323345;
  color: white;
  font-family: "Roboto", monospace;
`;

const SubmitButton = styled.button`
  font-family: "Roboto", monospace;
  background-color: #323345;
  border: none;
  border-radius: 0.25rem;
  color: white;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #353649;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:disabled {
    background-color: #323345;
  }
  padding: 0.5rem;
  width: 150px;
  justify-self: center;
`;

const InputsWrapper = styled.div`
  display: grid;
  place-content: center;
  text-align: center;
  background-color: #47485b;
  color: #fff;
  font-size: 1em;
  padding-top: 20px;
  border-radius: 1em;
  height: auto;
  width: 700px;
  margin: 30px auto;
`;

const TextAreaStyled = styled.textarea`
  font-family: "Roboto", monospace;
  color: white;
  background: transparent;
  outline: none;
  border: none;
  resize: none;
  width: var(--text-area-width);
  height: var(--text-area-height);
  ::placeholder {
    color: lightgrey;
    opacity: 0.8;
  }
`;

const TextAreaReceivers = styled.textarea`
  font-family: "Roboto", monospace;
  color: white;
  background: transparent;
  outline: none;
  border: none;
  resize: none;
  width: var(--text-area-width);
  height: 100px;
  ::placeholder {
    color: lightgrey;
    opacity: 0.8;
  }
`;

const RepoTitle = styled.h3`
  color: lightgreen;
`;

const ReceiversTitle = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: var(--text-area-width);
`;
