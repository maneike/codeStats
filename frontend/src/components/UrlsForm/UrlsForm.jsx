import { useState } from "preact/hooks";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import InputsWrapper from "../InputsWrapper";
import Line from "../Line";
import UrlsToMergeList from "../UrlsToMergeList";
import SubmitButton from "../SubmitButton";

import { postUrls } from "../../services/postUrls";

import { regex } from "../../helpers/extractRepoNameFromUrl";

const UrlsForm = ({
  receivers,
  setReceivers,
  isLoading,
  setLoading,
  setFetchedRepos,
}) => {
  const [repoUrlsToMerge, setRepoUrlsToMerge] = useState([]);
  const [mergedUrls, setMergedUrls] = useState([]);

  const submitUrl = (e) => {
    e.preventDefault();

    receivers && mergedUrls && setLoading(true);

    !receivers && alert("Please provide an email ✘");
    !mergedUrls && alert("Please provide the urls (ending with .git) ✘");

    mergedUrls &&
      receivers &&
      postUrls(
        receivers.split(",").map((item) => item.trim()),
        mergedUrls,
        setFetchedRepos,
        setLoading
      );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      e.target.value.split(",").map((url) => {
        setRepoUrlsToMerge((repoUrlsToMerge) => [
          ...repoUrlsToMerge,
          url.trim(),
        ]);

        const repoName = url.match(/\/([^/]+)\.git$/)[1];

        // if(new_name == name) add({old_name: name, new_name:name})
        setMergedUrls((mergedUrls) => [
          ...mergedUrls,
          {
            old: {
              name: repoName,
              url: url.trim(),
            },
            new: {
              name: repoName,
              url: url.trim(),
            },
          },
        ]);
      });
    }
  };

  // const confirmUrls = (e) => {
  //     e.preventDefault();
  //     e.target.value.split(",").map((url) => {
  //       setRepoUrlsToMerge((repoUrlsToMerge) => [...repoUrlsToMerge, url.trim()]);

  //       const repoName = regex.exec(url)[5].replace(".git", "").trim();

  //       setMergedUrls((mergedUrls) => [
  //         ...mergedUrls,
  //         {
  //           old: {
  //             name: repoName,
  //             url: url.trim(),
  //           },
  //           new: {
  //             name: repoName,
  //             url: url.trim(),
  //           },
  //         },
  //       ]);
  //     });
  //   };

  return (
    <form>
      <InputsWrapper>
        <TextAreaReceivers
          placeholder="Enter email(s) to send report to"
          value={receivers}
          onChange={(e) => setReceivers(e.target.value)}
        />
      </InputsWrapper>
      <InputsWrapper>
        <TextAreaReceivers
          placeholder="Paste the repo URLs (with .git at the end) and submit them with enter"
          type="text"
          onKeyDown={handleKeyDown}
          // onChange={(e) => setRepoUrlsToMerge(e.target.value)}
        />
        {/* {mergedUrls.length === 0 && (
                <SubmitButton onClick={(e) => confirmUrls(e)}>
                  Confirm
                </SubmitButton>
              )} */}
        {repoUrlsToMerge && (
          <UrlsToMergeList
            repoUrlsToMerge={repoUrlsToMerge}
            mergedUrls={mergedUrls}
            setMergedUrls={setMergedUrls}
            value={mergedUrls}
            onChange={(e) => setMergedUrls(e.target.value)}
          />
        )}
        <SubmitButton
          type="submit"
          disabled={isLoading || !receivers || !mergedUrls}
          onClick={submitUrl}
        >
          Submit
        </SubmitButton>
      </InputsWrapper>
      {isLoading && (
        <Blackout>
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        </Blackout>
      )}
    </form>
  );
};

export default UrlsForm;

const TextAreaReceivers = styled.textarea`
  font-family: "Roboto", monospace;
  color: white;
  background: transparent;
  outline: none;
  border: none;
  resize: none;
  width: var(--text-area-width);
  height: 100px;
  ::placeholder {
    color: lightgrey;
    opacity: 0.8;
  }
  margin: 0 auto;
  @media (min-width: 320px) {
    width: var(--text-area-width-320);
  }
  @media (min-width: 768px) {
    width: var(--text-area-width-768);
  }
  @media (min-width: 1024px) {
    width: var(--text-area-width);
  }
`;

const Blackout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const spin = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid lightgreen;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.8s linear infinite;
`;
