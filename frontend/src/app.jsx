import { useEffect, useState } from "preact/hooks";
import styled from "@emotion/styled";
import { postFiles } from "./services/postFiles";
import { postUrls } from "./services/postUrls";
import { postMergedUsers } from "./services/postMergedUsers";
import FileUploader from "./components/FileUploader";
import NavBar from "./components/NavBar";
import "./index.css";
import aggregateRepoData from "./helpers/aggregateRepoData";

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [repoUrls, setRepoUrls] = useState("");
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

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    selectedFile &&
      postFiles(selectedFile, formData, setFetchedRepos, setLoading);
  };

  const submitUrl = (e) => {
    e.preventDefault();
    setLoading(true);
    repoUrls &&
      receivers &&
      postUrls(
        repoUrls.split(",").map((item) => item.trim()),
        receivers.split(",").map((item) => item.trim()),
        setFetchedRepos,
        setLoading
      );
  };

  const submitRepoForm = (e, repoId) => {
    e.preventDefault();
    setLoading(true);
    aggregatedRepos != [] &&
      postMergedUsers(aggregatedRepos[repoId], setLoading);
  };

  return (
    <>
      <NavBar />

      <form>
        <InputsWrapper>
          <TextAreaReceivers
            placeholder="emails"
            value={receivers}
            onChange={(e) => setReceivers(e.target.value)}
          ></TextAreaReceivers>
          <TextAreaStyled
            placeholder="Paste the repo URLs (with .git at the end) separated by commas..."
            value={repoUrls}
            onChange={(e) => setRepoUrls(e.target.value)}
          ></TextAreaStyled>
          <SubmitButton disabled={isLoading} onClick={submitUrl}>
            Submit
          </SubmitButton>
        </InputsWrapper>
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
  margin: 100px auto;
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
  height: 200px;
  ::placeholder {
    color: lightgrey;
    opacity: 0.8;
  }
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin: 0 10px;
`;

const DropdownSelect = styled.select`
  font-family: "Roboto", monospace;
  color: white;
  border: 1px solid #fafafa;
  border-radius: 8px;
  background: #56576b;
  padding: 8px;
  margin: 0 10px;
`;

const RepoTitle = styled.h3`
  color: lightgreen;
`;
