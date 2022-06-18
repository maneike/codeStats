import { useState } from "preact/hooks";
import FileUploader from "./components/FileUploader";

import { postUrls } from "./services/postUrls";
import { postFiles } from "./services/postFiles";

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
      <form>
        <FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />
        <input
          placeholder="Paste a repo URL..."
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        ></input>
        <button onClick={submitForm}>Submit</button>
      </form>
    </>
  );
}
