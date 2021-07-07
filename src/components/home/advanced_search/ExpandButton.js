import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IconAndTextBtn from './IconAndTextBtn';

function ExpandButton({ isExpanded, setIsExpand, text }) {
    return (
        <IconAndTextBtn
            onCLickFunc={() => { setIsExpand(!isExpanded); }}
            btnClassName={"expand-button"}
            iconClassName={isExpanded ? "" : "closed-icon"}
            icon={faTimes}
            text={text}
        />
    );
}

export default ExpandButton;