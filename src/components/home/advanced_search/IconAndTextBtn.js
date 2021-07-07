import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function IconAndTextBtn({ onCLickFunc, btnClassName, iconClassName, icon, text }) {
    return (
        <button onClick={onCLickFunc} className={"icon-and-text-btn " + btnClassName}>
            <FontAwesomeIcon className={"icon " + iconClassName} icon={icon} />
            { text }
        </button>
    );
}

export default IconAndTextBtn;