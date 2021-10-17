import React from "react";

function FileDisplay({ file }) {
    return (
        <>
            {file?.mimetype?.includes("video") ? (
                <video controls muted>
                    <source
                        src={
                            process.env.REACT_APP_ROOT_URL +
                            `apartments/get-file?key=${file.key}`
                        }
                        type={"video"}
                    />
                </video>
            ) : (
                <img
                    src={
                        process.env.REACT_APP_ROOT_URL +
                        `apartments/get-file?key=${file.key}`
                    }
                    alt={file.originalName}
                ></img>
            )}
        </>
    );
}

export default FileDisplay;
