import { useState } from "preact/hooks";
import FileUploader from "./components/FileUploader";

import axios from "redaxios";

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [repoUrl, setRepoUrl] = useState("");

  const submitForm = (e) => {
    const formData = new FormData();
    if (repoUrl) {
      axios
        .post("http://localhost:8000/api/url/", { url: repoUrl })
        .then((res) => {
          alert("File Upload success", res);
        })
        .catch((err) => {
          alert("File Upload Error", err);
        });
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
      axios
        .post("http://localhost:8000/api/zip/", formData)
        .then((res) => {
          alert("File Upload success", res);
        })
        .catch((err) => alert("File Upload Error", err));
    }
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
