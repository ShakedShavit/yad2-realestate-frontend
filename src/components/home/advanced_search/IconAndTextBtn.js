import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function IconAndTextBtn({
    onCLickFunc,
    btnClassName,
    iconClassName,
    icon,
    text,
    chosenFeaturesCounter = 0,
    type = 'button'
}) {
    return (
        <button type={type || "button"} onClick={onCLickFunc} className={"icon-and-text-btn " + btnClassName}>
            { chosenFeaturesCounter > 0 && <div className="orange-circle"></div> }

            <FontAwesomeIcon className={"icon " + iconClassName} icon={icon} />
            { text }
        </button>
    );
}

export default IconAndTextBtn;