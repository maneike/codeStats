import styled from "@emotion/styled";
const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  background-color: #323345;
  position: fixed;
  padding: 15px 20px;
  top: -16px;
  right: 0;
  height: 100vh;
  width: 180px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;

  li {
    font-size: 1.2rem;
    padding: 20px;
  }
  li:hover {
    background-color: #353649;
    cursor: pointer;
  }
  li:nth-of-type(5) {
    color: lightgreen;
  }
`;

const NavList = ({ open }) => {
  return (
    <Ul open={open}>
      <li>Home</li>
      <li>About Us</li>
      <li>Raports</li>
      <li>Settings</li>
      <li>Contact</li>
    </Ul>
  );
};

export default NavList;
