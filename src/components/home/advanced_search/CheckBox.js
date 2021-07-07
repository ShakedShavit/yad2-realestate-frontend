import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


function CheckBox(props) {
    return (
        <div className={props.isChecked ? "checkbox checkbox-checked" : "checkbox checkbox-unchecked"}>
            { props.isChecked && <FontAwesomeIcon className="icon" icon={props.icon || faCheck} /> }
        </div>
    );
}

export default CheckBox;