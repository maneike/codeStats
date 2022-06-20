import styled from "@emotion/styled";

const Header = () => {
  return (
    <>
      <HeaderStyled>
        <Hamburger>
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="15" rx="8"></rect>
            <rect y="30" width="100" height="15" rx="8"></rect>
            <rect y="60" width="100" height="15" rx="8"></rect>
          </svg>
        </Hamburger>
        <h1>codestats</h1>
      </HeaderStyled>
    </>
  );
};

const HeaderStyled = styled.header`
  & > * {
    margin: 1rem;
  }
  font-family: "Roboto", monospace;
  background-color: #323345;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const Hamburger = styled.div`
  & > svg {
    fill: white;
    width: 30px;
  }
  & > svg:hover {
    fill: lightgray;
    cursor: pointer;
  }
`;

export default Header;
