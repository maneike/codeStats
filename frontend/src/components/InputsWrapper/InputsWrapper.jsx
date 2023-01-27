import styled from "@emotion/styled";

const InputsWrapper = styled.div`
  display: grid;
  place-content: center;
  text-align: center;
  background-color: #47485b;
  color: #fff;
  font-size: 1em;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 1em;
  height: auto;
  width: var(--inputs-wrapper-width);
  margin: 30px auto;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default InputsWrapper;
