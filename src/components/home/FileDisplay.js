import React from "react";

function FileDisplay({ file }) {
  return (
    <>
      {file.FileKey.includes("video") ? (
        <video controls muted>
          <source
            src={
              process.env.REACT_APP_ROOT_URL +
              `apartments/get-file?key=${file.FileKey}`
            }
            type={"video"}
          />
        </video>
      ) : (
        <img
          src={
            process.env.REACT_APP_ROOT_URL +
            `apartments/get-file?key=${file.FileKey}`
          }
          alt={file.originalName}
        ></img>
      )}
    </>
  );
}

export default FileDisplay;
