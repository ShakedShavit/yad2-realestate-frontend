import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons';

function FileInput({ isImage, isMainImage }) {
    const [chosenFile, setChosenFile] = useState('');
    const [isShown, setIsShown] = useState(true);
    const fileRef = useRef(null);

    const removeFileOnClick = () => {
        setChosenFile('');
        fileRef.current.value = '';
    }

    return (
        <div
            className={isMainImage ? "file-input-container main-file-input__container" : "file-input-container"}
            onMouseEnter={() => setIsShown(false)}
            onMouseLeave={() => setIsShown(true)}
        >
            { isMainImage &&
                <span className="main-image-title">תמונה ראשית</span>
            }

            { chosenFile.length > 0 &&
                <>
                { isImage &&
                <div className="icon-container">
                    <FontAwesomeIcon className="file-input-icon" icon={faPen} />
                </div>
                }
    
                <div className="icon-container delete-icon">
                    <FontAwesomeIcon onClick={removeFileOnClick} className="file-input-icon" icon={faTrashAlt} />
                </div>
                </>
            }

            <div className="input-container">
                <div className="chose-file-container">
                    { isImage ?
                        <>
                        <FontAwesomeIcon className="chose-file-icon" icon={faPlus} />
                        <span>העלאת תמונות</span>
                        </>
                        :
                        <>
                        { chosenFile.length === 0 ?
                            <>
                            <FontAwesomeIcon className="chose-file-icon" icon={faVideo} />
                            <span>העלאת סרטון</span>
                            </>
                            :
                            <span className="video-upload-message">הסרטון עלה, אפשר להמשיך בפרסום</span>
                        }
                        </>
                    }
                </div>

                <input name="files" ref={fileRef} onChange={(e) => { setChosenFile(e.target.value); }} type="file" accept={ isImage ? "image/*" : "video/*" }></input>
                { isImage && chosenFile.length > 0 && isShown &&
                    <img
                        src={URL.createObjectURL(fileRef.current.files[0])}
                        alt="chosen-file">
                    </img>
                }
            </div>
        </div>
    );
}

export default FileInput;

//isImage

//            