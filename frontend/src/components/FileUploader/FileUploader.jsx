import styled from "@emotion/styled";
import { useState } from "preact/hooks";

const FileUploader = ({ onFileSelectError, onFileSelectSuccess }) => {
  const [fileName, setFileName] = useState("");

  const handleFileInput = (files) => {
    const file = files[0];
    file
      ? onFileSelectSuccess(file) & setFileName(file.name)
      : onFileSelectError({ error: "Please select a file" });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileInput(e.dataTransfer.files);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    file
      ? onFileSelectSuccess(file) & setFileName(file.name)
      : onFileSelectError({ error: "Please select a file" });
  };

  return (
    <>
      <Label
        for="upload-files"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <CloudSVG>
          <svg
            width="135"
            height="130"
            viewBox="0 0 170 165"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M131.497 66.6891C127.739 45.6167 108.221 30.8426 86.5054 32.6326C64.7896 34.4225 48.0545 52.1847 47.9283 73.5773C28.5522 73.5773 12.8448 88.997 12.8448 108.018C12.8448 127.039 28.5522 142.459 47.9283 142.459H69.7545V103.689H47.9283L86.5054 70.7787L121.878 103.689H99.3915V142.459H128.62C149.934 143.239 167.856 126.909 168.651 105.986C169.445 85.0629 152.811 67.469 131.497 66.6891Z"
              fill="#323345"
            />
          </svg>
        </CloudSVG>
        <h2>Choose a file or drag it here</h2>
      </Label>
      <p>
        <b>File:</b> {fileName}
      </p>
      <FileInputStyled
        id="upload-files"
        type="file"
        onChange={handleClick}
        multiple
      />
      <H5>Supports: ZIP containing .git</H5>
    </>
  );
};

export default FileUploader;

const FileInputStyled = styled.input`
  font-family: "Roboto", monospace;
  color: darkgray;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  width: 400px;
  display: none;
`;

const CloudSVG = styled.div`
  display: flex;
  justify-content: center;
`;

const H5 = styled.h5`
  color: lightgray;
`;

const Label = styled.label`
  background-color: #56576b;
  width: 400px;
  margin: 0 auto;
  border: 3px dotted lightgreen;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: lightgreen;
    opacity: 0.7;
    border: 3px dotted black;
    color: black;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;
