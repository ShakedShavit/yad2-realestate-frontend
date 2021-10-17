import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import FileDisplay from "../FileDisplay";

function FilesModal({ files, setIsDisplayFilesModalOpen }) {
    const defaultArrowClassName = "navigate-files-arrow";
    const defaultEnlargeBtnClassName = "enlarge-image-btn";

    const [currFileIndex, setCurrFileIndex] = useState(0);
    const [arrowClassName, setArrowClassName] = useState(defaultArrowClassName);
    const [enlargeBtnClassName, setEnlargeBtnClassName] = useState(
        defaultEnlargeBtnClassName
    );
    const [isImageEnlarged, setIsImageEnlarged] = useState(false);

    const navigateFilesOnClick = (type) => {
        if (type === "NEXT") {
            if (currFileIndex === files.length - 1) return setCurrFileIndex(0);
            setCurrFileIndex(currFileIndex + 1);
        } else {
            if (currFileIndex === 0) return setCurrFileIndex(files.length - 1);
            setCurrFileIndex(currFileIndex - 1);
        }
    };

    const fileContainerOnEnterOrLeave = (type) => {
        if (type === "ENTER") {
            setArrowClassName(defaultArrowClassName);
            setEnlargeBtnClassName(defaultEnlargeBtnClassName);
        } else {
            setArrowClassName(defaultArrowClassName + " hide");
            setEnlargeBtnClassName(defaultEnlargeBtnClassName + " hide");
        }
    };

    return (
        <div
            className="modal-wrapper files-modal-wrapper"
            onClick={() => {
                setIsDisplayFilesModalOpen(false);
            }}
        >
            <div
                className="modal-content"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {!isImageEnlarged ? (
                    <>
                        <button
                            onClick={() => {
                                setIsDisplayFilesModalOpen(false);
                            }}
                        >
                            <FontAwesomeIcon className="icon" icon={faTimes} />
                            חזרה למודעה
                        </button>

                        <div
                            className="file-container"
                            onMouseEnter={() => {
                                fileContainerOnEnterOrLeave("ENTER");
                            }}
                            onMouseLeave={() => {
                                fileContainerOnEnterOrLeave("LEAVE");
                            }}
                        >
                            <div
                                className={arrowClassName}
                                onClick={() => {
                                    navigateFilesOnClick("PREV");
                                }}
                            >
                                &#x276C;
                            </div>
                            <div
                                className={arrowClassName}
                                onClick={() => {
                                    navigateFilesOnClick("NEXT");
                                }}
                            >
                                &#x276D;
                            </div>

                            {!files[currFileIndex].key.includes("video") && (
                                <button
                                    className={enlargeBtnClassName}
                                    onClick={() => {
                                        setIsImageEnlarged(true);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faExpandAlt}
                                    />
                                    מסך מלא
                                </button>
                            )}

                            <FileDisplay file={files[currFileIndex]} />

                            <span className="file-counter-message">{`תמונה ${
                                currFileIndex + 1
                            } מתוך ${files.length}`}</span>
                        </div>
                    </>
                ) : (
                    <>
                        {!files[currFileIndex].key.includes("video") && (
                            <div className="enlarged-image">
                                <div
                                    className="close-full-display"
                                    onClick={() => {
                                        setIsImageEnlarged(false);
                                    }}
                                >
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faTimes}
                                    />
                                </div>
                                <FileDisplay file={files[currFileIndex]} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default FilesModal;
