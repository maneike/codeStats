import styled from "@emotion/styled";

import DropdownSelect from "../DropdownSelect";
import Ul from "../Ul";
import Li from "../Li";

const UrlsToMergeList = ({ repoUrlsToMerge }) => (
  <List>
    <Ul>
      {repoUrlsToMerge.map((url, index) => (
        <Li>
          <StyledDropdownSelect>
            <option key={`mergeItem-url-${index}`}>{url}</option>
          </StyledDropdownSelect>
          <StyledDropdownSelect>
            {repoUrlsToMerge.map((everyUrl, index) => (
              <option key={`allMergeItem-url-${index}`}>{everyUrl}</option>
            ))}
          </StyledDropdownSelect>
        </Li>
      ))}
    </Ul>
  </List>
);

const List = styled.div``;

const StyledDropdownSelect = styled(DropdownSelect)`
  width: 40%;
`;

export default UrlsToMergeList;
