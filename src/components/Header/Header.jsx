import styled from "@emotion/styled";

const Header = () => {
  return (
    <HeaderStyled>
      <h1>codestats</h1>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  font-family: "Roboto", monospace;
  background-color: #323345;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default Header;
