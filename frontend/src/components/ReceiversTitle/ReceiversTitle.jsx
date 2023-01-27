import styled from "@emotion/styled";

const ReceiversTitle = ({ receivers }) => {
  return (
    <StyledReceiversTitle>
      Your report will be sent to: {receivers}
    </StyledReceiversTitle>
  );
};

const StyledReceiversTitle = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: var(--text-area-width);
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default ReceiversTitle;
