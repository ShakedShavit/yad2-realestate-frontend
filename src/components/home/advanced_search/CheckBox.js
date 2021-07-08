import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


function CheckBox(props) {
    const defaultClassName = "checkbox";
    const [checkBoxClassName, setCheckBoxClassName] = useState(defaultClassName);

    useEffect(() => {
        let newClassName = defaultClassName;

        if (props.isChecked) newClassName += " checkbox-checked";
        else newClassName += " checkbox-unchecked";

        if (props.isHovered && props.isChecked) newClassName += " checkbox-checked-hovered";
        else if (props.isHovered && !props.isChecked) newClassName += " checkbox-unchecked-hovered";

        setCheckBoxClassName(newClassName);
    }, [props.isChecked, props.isHovered]);

    return (
        <div className={checkBoxClassName}>
            { props.isChecked && <FontAwesomeIcon className="icon" icon={props.icon || faCheck} /> }
        </div>
    );
}

export default CheckBox;