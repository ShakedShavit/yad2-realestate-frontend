import React, { useContext, useState } from 'react';
import { LoginContext } from '../../context/loginContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

function FileDisplay({ file, className, filesLen, isApartmentExpanded }) {
    const { userDataState } = useContext(LoginContext);

    const [showFilesLen, setShowFilesLen] = useState(false);

    return (
        <div onMouseEnter={() => { setShowFilesLen(true); }} onMouseLeave={() => { setShowFilesLen(false); }} className={"file-display-container " + className}>
            <img src={process.env.REACT_APP_ROOT_URL + `apartments/get-file?key=${file.key}&token=${userDataState.token}`} alt={file.originalName}></img>
            { ((showFilesLen || isApartmentExpanded) && filesLen > 1 ) &&
                <div className="image-count-container">
                    <FontAwesomeIcon className="icon" icon={faImages} />
                    <span>{filesLen - 1}+</span>
                </div>
            }
        </div>
    );
}

export default FileDisplay;
