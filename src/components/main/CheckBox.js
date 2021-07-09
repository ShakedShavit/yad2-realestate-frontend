import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


function CheckBox({
    isChecked,
    isHovered,
    icon
}) {
    const defaultClassName = "checkbox";
    const [checkBoxClassName, setCheckBoxClassName] = useState(defaultClassName);

    useEffect(() => {
        let newClassName = defaultClassName;

        if (isChecked) newClassName += " checkbox-checked";
        else newClassName += " checkbox-unchecked";

        if (isHovered && isChecked) newClassName += " checkbox-checked-hovered";
        else if (isHovered && !isChecked) newClassName += " checkbox-unchecked-hovered";

        setCheckBoxClassName(newClassName);
    }, [isChecked, isHovered]);

    return (
        <div className={checkBoxClassName}>
            { isChecked && <FontAwesomeIcon className="icon" icon={icon || faCheck} /> }
        </div>
    );
}

export default CheckBox;