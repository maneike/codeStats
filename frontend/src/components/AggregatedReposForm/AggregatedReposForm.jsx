import { useState } from "preact/hooks";

import styled from "@emotion/styled";

import InputsWrapper from "../InputsWrapper";
import Ul from "../Ul";
import Li from "../Li";
import DropdownSelect from "../DropdownSelect";
import SubmitButton from "../SubmitButton";

import { postMergedUsers } from "../../services/postMergedUsers";

const AggregatedReposForm = ({
  isLoading,
  setLoading,
  aggregatedRepos,
  setAggregatedRepos,
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const submitRepoForm = (e, repoId) => {
    e.preventDefault();
    setLoading(true);
    aggregatedRepos.length > 0 &&
      postMergedUsers(aggregatedRepos[repoId], setLoading, selectedLanguages);
  };

  return (
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
  );
};

export default AggregatedReposForm;

const RepoTitle = styled.h3`
  color: lightgreen;
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
