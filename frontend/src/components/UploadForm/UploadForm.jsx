import { useState } from "preact/hooks";

import InputsWrapper from "../InputsWrapper";
import FileUploader from "../FileUploader";
import SubmitButton from "../SubmitButton";

import { postFiles } from "../../services/postFiles";

const UploadForm = ({ receivers, isLoading, setLoading, setFetchedRepos }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();

    receivers && setLoading(true);

    !receivers && alert("Please provide an email ✘");

    const formData = new FormData();

    selectedFile &&
      postFiles(
        receivers.split(",").map((item) => item.trim()),
        selectedFile,
        formData,
        setFetchedRepos,
        setLoading
      );
  };

  return (
    <form>
      <InputsWrapper>
        <FileUploader
          onFileSelectSuccess={(file) => setSelectedFile(file)}
          onFileSelectError={({ error }) => alert(error)}
        />
        <SubmitButton disabled={isLoading} onClick={submitForm}>
          Submit
        </SubmitButton>
      </InputsWrapper>
    </form>
  );
};
export default UploadForm;
