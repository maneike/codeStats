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
        {repoNames.map((url) => (
          <StyledLi>
            {url}
            <Line />
            <StyledDropdownSelect>
              {repoNames.map((everyUrl, index) => (
                <option key={`allMergeItem-url-${index}`}>{everyUrl}</option>
              ))}
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
