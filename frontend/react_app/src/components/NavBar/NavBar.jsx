import styled from "@emotion/styled";
import Burger from "./Burger";

const Nav = styled.nav`
  background-color: #323345;
  width: 100%;
  height: 50px;
  box-shadow: 0 3px 0 0 #0000;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  color: #fff;

  .logo {
    font-size: 2rem;
    font-weight: 700;
    padding: 0px 15px;
  }
`;

const NavBar = () => {
  return (
    <>
      <Nav>
        <div className="logo">codeStats</div>

        <Burger />
      </Nav>
    </>
  );
};

export default NavBar;
