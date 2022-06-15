import { useState } from "preact/hooks";
import FileUploader from "./components/FileUploader";

import axios from "redaxios";

export function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const submitForm = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", selectedFile);
    axios
      .post("localhost:3000", formData)
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error"));
  };

  return (
    <>
      <FileUploader
        onFileSelectSuccess={(file) => setSelectedFile(file)}
        onFileSelectError={({ error }) => alert(error)}
      />
    </>
  );
}
