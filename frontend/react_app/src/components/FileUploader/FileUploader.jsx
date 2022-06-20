import styled from "@emotion/styled";

const FileUploader = ({ onFileSelectError, onFileSelectSuccess }) => {
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file.size > 1024)
      onFileSelectError({
        error: "File size cannot exceed more than 1MB",
      });
    else onFileSelectSuccess(file);
  };

  return (
    <>
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
      <h2>Drag & Drop</h2>
      <p>or</p>
      <FileInputStyled type="file" onChange={handleFileInput} />
      <Htag>Supports: ZIP</Htag>
    </>
  );
};

export default FileUploader;

const FileInputStyled = styled.input`
  font-family: "Roboto", monospace;
  color: darkgray;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const CloudSVG = styled.div`
style="display:flex; justify-content:center;"
`;

const Htag = styled.h5`
  margin: 0;
  margin-bottom: 1em;
`;
