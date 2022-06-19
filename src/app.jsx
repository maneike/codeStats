import { useState } from "preact/hooks";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import { postUrls } from "./services/postUrls";
import { postFiles } from "./services/postFiles";
import FileUploader from "./components/FileUploader";
import Header from "./components/Header";

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [repoUrl, setRepoUrl] = useState("");

  const submitForm = (e) => {
    const formData = new FormData();
    repoUrl && postUrls(repoUrl);
    selectedFile && postFiles(selectedFile, formData);
    e.preventDefault();
  };

  return (
    <>
      <Global styles={GlobalStyles} />
      <Header />
      <AppWrapper>
        <Form>
          <InputsWrapper>
            <TextAreaStyled
              placeholder="Paste a repo URL..."
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            ></TextAreaStyled>
            <SubmitButton onClick={submitForm}>Submit</SubmitButton>
          </InputsWrapper>
          <InputsWrapper>
            <FileUploader
              onFileSelectSuccess={(file) => setSelectedFile(file)}
              onFileSelectError={({ error }) => alert(error)}
            />
          </InputsWrapper>
        </Form>
      </AppWrapper>
    </>
  );
}

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
    background-color: #lightgray;
  }
  max-width: 50%;
  margin-left: 100px;
  padding: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
`;

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const InputsWrapper = styled.div`
  display: grid;
  place-content: center;

  text-align: center;
  background-color: #47485b;
  color: #fff;
  font-size: 1em;
  padding-top: 20px;
  margin: 30px 30px;
  border-radius: 1em;
  width: 500px;
  max-height: 500px;
`;

const GlobalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
  html,
  body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background: #131b30;
    font-family: "Roboto", monospace;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Roboto Mono", monospace;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  :root {
    --text-area-width: 450px;
    --text-area-height: 350px;
  }
`;

const TextAreaStyled = styled.textarea`
  font-family: "Roboto", monospace;
  color: white;
  background: transparent;
  outline: none;
  border: none;
  resize: none;
  width: var(--text-area-width);
  height: var(--text-area-height);
`;
