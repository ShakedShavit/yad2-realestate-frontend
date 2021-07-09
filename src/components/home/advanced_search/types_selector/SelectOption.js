import React, { useState } from 'react';
import CheckBox from '../../../main/CheckBox';

function SelectOption(props) {
    const [isHoveredOver, setIsHoveredOver] = useState(false);

    const optionOnClick = () => {
        const valueIndex = props.chosenOptions.indexOf(props.value);

        if (valueIndex === -1)
            return props.setChosenOptions([ ...props.chosenOptions, props.value ]);

        let newChosenOptions = [...props.chosenOptions];
        newChosenOptions.splice(valueIndex, 1);
        props.setChosenOptions(newChosenOptions);
    }

    return (
        <div
            onClick={optionOnClick}
            onMouseEnter={() => { setIsHoveredOver(true); }}
            onMouseLeave={() => { setIsHoveredOver(false); }}
            className="select-option"
        >
            <CheckBox
                isChecked={props.chosenOptions.includes(props.value)}
                isHovered={isHoveredOver}
            />
            <span>{props.value}</span>
        </div>
    );
}

export default SelectOption;