import styled from "@emotion/styled";

import DropdownSelect from "../DropdownSelect";
import Ul from "../Ul";
import Li from "../Li";

import { regex } from "../../helpers/extractRepoNameFromUrl";
const UrlsToMergeList = ({ repoUrlsToMerge }) => {
  const repoNames = repoUrlsToMerge.map((repoUrl) => {
    const repoName = regex.exec(repoUrl)[5].replace(".git", "");
    return repoName;
  });
  return (
    <List>
      <Ul>
        {repoNames.map((url, index) => (
          <Li>
            <StyledDropdownSelect>
              <option key={`mergeItem-url-${index}`}>{url}</option>
            </StyledDropdownSelect>
            <StyledDropdownSelect>
              {repoNames.map((everyUrl, index) => (
                <option key={`allMergeItem-url-${index}`}>{everyUrl}</option>
              ))}
            </StyledDropdownSelect>
          </Li>
        ))}
      </Ul>
    </List>
  );
};

const List = styled.div``;

const StyledDropdownSelect = styled(DropdownSelect)`
  width: 40%;
`;

export default UrlsToMergeList;
