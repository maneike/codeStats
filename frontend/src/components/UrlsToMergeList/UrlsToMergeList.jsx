import styled from "@emotion/styled";

import DropdownSelect from "../DropdownSelect";
import Ul from "../Ul";
import Li from "../Li";

import { regex } from "../../helpers/extractRepoNameFromUrl";

const UrlsToMergeList = ({ repoUrlsToMerge, mergedUrls, setMergedUrls }) => {
  const repoNames = repoUrlsToMerge.map((repoUrl) => {
    const repoName = regex.exec(repoUrl)[5].replace(".git", "");
    return { name: repoName, url: repoUrl };
  });
  return (
    <List>
      <Ul>
        {repoNames.map((repo, index) => {
          return (
            <StyledLi key={`${repo.name}-${index}`}>
              {repo.name}
              <Line />
              <StyledDropdownSelect
                onChange={(e) => {
                  // remove repo.name from mergedUrls first
                  const filteredMergedUrls = mergedUrls.filter(
                    (mergedUrl) => Object.keys(mergedUrl)[0] !== repo.name
                  );
                  filteredMergedUrls.push({
                    old: {
                      name: repo.name,
                      url: repo.url,
                    },
                    new: {
                      name: e.target.value,
                      url: repoUrlsToMerge.find(
                        (repoUrl) =>
                          regex.exec(repoUrl)[5].replace(".git", "") ===
                          e.target.value
                      ),
                    },
                  });
                  setMergedUrls([...filteredMergedUrls]);
                }}
              >
                {repoNames.map((repo, listIndex) => {
                  return (
                    <option
                      key={`${repo.name}-${listIndex}-select`}
                      value={repo.name}
                      selected={index === listIndex}
                    >
                      {repo.name}
                    </option>
                  );
                })}
              </StyledDropdownSelect>
            </StyledLi>
          );
        })}
      </Ul>
    </List>
  );
};

const List = styled.div``;

const StyledLi = styled(Li)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDropdownSelect = styled(DropdownSelect)`
  width: max-content;
`;

const Line = styled.hr`
  width: 100%;
  margin: 0 32px;
`;
export default UrlsToMergeList;
