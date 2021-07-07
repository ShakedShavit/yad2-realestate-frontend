import React from 'react';
import CheckBox from '../CheckBox';

function SelectOption(props) {
    const isOptionChosen = () => props.chosenOptions.include(props.value);

    return (
        <div onClick={() => { if (!isOptionChosen) props.setChosenOptions([ ...props.chosenOptions, props.value ]) }}>
            <CheckBox isChecked={isOptionChosen} />
            <b>{props.value}</b>
        </div>
    );
}

export default SelectOption;