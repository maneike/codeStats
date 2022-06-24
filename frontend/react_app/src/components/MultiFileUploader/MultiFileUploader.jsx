import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";

export function MultiFileUploader() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/x-zip-compressed": [],
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {(file.size / (1024 * 1024)).toFixed(3)} MB
    </li>
  ));

  const formData = new FormData();

  const fileObjects = acceptedFiles.map((file) => {
    formData.append("files", file);
  });

  console.log(formData.getAll("files"));

  return (
    <Section className="container">
      <DropzoneDiv {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em style="color: lightgray">
          (Only *.zip containing .git will be accepted)
        </em>
      </DropzoneDiv>
      <aside>
        <h4>Files</h4>
        <ul>{acceptedFileItems}</ul>
      </aside>
    </Section>
  );
}

export default MultiFileUploader;

const DropzoneDiv = styled.div`
  background: #57586c;
  border: 2px dashed lightgreen;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const Section = styled.section`
  h4 {
    font-size: 1rem;
  }
  ul {
    font-size: 0.9rem;
  }
`;
