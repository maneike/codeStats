import styled from "@emotion/styled";

const SubmitButton = styled.button`
  font-family: "Roboto", monospace;
  background-color: #323345;
  border: none;
  border-radius: 0.25rem;
  color: white;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #353649;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:hover:disabled {
    background-color: #323345;
  }
  padding: 0.5rem;
  width: 150px;
  justify-self: center;
`;

export default SubmitButton;
