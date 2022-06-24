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

  useEffect(() => {
    const temp = [];
    fetchedRepos?.data?.map((repo) => {
      temp.push(aggregateRepoData(repo));
    });

    setAggregatedRepos(temp);
  }, [fetchedRepos]);

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    selectedFile && postFiles(selectedFile, formData, setFetchedRepos);
  };

  const submitUrl = (e) => {
    e.preventDefault();
    repoUrls &&
      postUrls(
        repoUrls.split(",").map((item) => item.trim()),
        setFetchedRepos
      );
  };

  const submitRepoForm = (e, repoId) => {
    e.preventDefault();
    aggregatedRepos != [] && postMergedUsers(aggregatedRepos[repoId]);
  };

  return (
    <>
      <NavBar />

      <form>
        <InputsWrapper>
          <TextAreaStyled
            placeholder="Paste the repo URLs (with .git at the end) separated by commas..."
            value={repoUrls}
            onChange={(e) => setRepoUrls(e.target.value)}
          ></TextAreaStyled>
          <SubmitButton onClick={submitUrl}>Submit</SubmitButton>
        </InputsWrapper>
      </form>

      <form>
        <InputsWrapper>
          <FileUploader
            onFileSelectSuccess={(file) => setSelectedFile(file)}
            onFileSelectError={({ error }) => alert(error)}
          />
          <SubmitButton onClick={submitForm}>Submit</SubmitButton>
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
                  <SubmitButton onClick={(e) => submitRepoForm(e, repoId)}>
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
  padding: 0.5rem;
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
  background: transparent;
  padding: 8px;
  margin: 0 10px;
`;

const Options = styled.option`
  font-family: "Roboto", monospace;
  background: transparent;
  color: white;
`;

const RepoTitle = styled.h3`
  color: lightgreen;
`;
