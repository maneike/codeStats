import styled from "@emotion/styled";

import DropdownSelect from "../DropdownSelect";
import Ul from "../Ul";
import Li from "../Li";

import { regex } from "../../helpers/extractRepoNameFromUrl";

const UrlsToMergeList = ({ repoUrlsToMerge, mergedUrls, setMergedUrls }) => {
  const repoNames = repoUrlsToMerge.map((repoUrl) => {
    const repoName = regex.exec(repoUrl)[5].replace(".git", "");
    return repoName;
  });
  return (
    <List>
      <Ul>
        {repoNames.map((repoName, index) => (
          <StyledLi key={`${repoName}-${index}`}>
            {repoName}
            <Line />
            <StyledDropdownSelect
              onChange={(e) => {
                // remove repoName from mergedUrls first
                const filteredMergedUrls = mergedUrls.filter(
                  (mergedUrl) => Object.keys(mergedUrl)[0] !== repoName
                );
                filteredMergedUrls.push({ [repoName]: e.target.value });
                setMergedUrls([...filteredMergedUrls]);
              }}
            >
              {repoNames.map((listRepoName, listIndex) => {
                return (
                  <option
                    key={`${listRepoName}-${listIndex}-select`}
                    value={listRepoName}
                    selected={index === listIndex}
                  >
                    {listRepoName}
                  </option>
                );
              })}
            </StyledDropdownSelect>
          </StyledLi>
        ))}
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
