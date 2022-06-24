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
`;

const NavList = ({ open }) => {
  return (
    <Ul open={open}>
      <li>Home</li>
      <li>Raports</li>
      <li>Raports</li>
      <li>Raports</li>
      <li>Raports</li>
    </Ul>
  );
};

export default NavList;
