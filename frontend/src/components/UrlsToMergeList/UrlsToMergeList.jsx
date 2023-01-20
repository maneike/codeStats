import styled from "@emotion/styled";

import DropdownSelect from "../DropdownSelect";
import Ul from "../Ul";
import Li from "../Li";

const UrlsToMergeList = ({ repoUrlsToMerge, mergedUrls, setMergedUrls }) => {
  const repoNames = repoUrlsToMerge.map((repoUrl) => {
    const repoName = repoUrl.match(/\/([^/]+)\.git$/)[1];
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
                  const filteredMergedUrls = mergedUrls.filter(
                    (mergedUrl) => Object.keys(mergedUrl)[0] !== repo.name
                  );
                  filteredMergedUrls[index] = {
                    ...filteredMergedUrls[index],
                    new: {
                      ...filteredMergedUrls[index].old,
                      name: e.target.value,
                    },
                  };
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
