import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import FileDisplay from '../FileDisplay';

function MainFile({ file, className, filesLen, isApartmentExpanded, isExpanded, setIsDisplayFilesModalOpen }) {
    const [showFilesLen, setShowFilesLen] = useState(false);

    return (
        <div
            onClick={(e) => { e.stopPropagation(); if (isExpanded) setIsDisplayFilesModalOpen(true); }}
            onMouseEnter={() => { setShowFilesLen(true); }}
            onMouseLeave={() => { setShowFilesLen(false); }}
            className={"file-display-container " + className}
        >

        <FileDisplay
            file={file}
        />
        
        { ((showFilesLen || isApartmentExpanded) && filesLen > 1 ) &&
            <div className="image-count-container">
                <FontAwesomeIcon className="icon" icon={faImages} />
                <span>{filesLen - 1}+</span>
            </div>
        }
        </div>
    );
}

export default MainFile;
