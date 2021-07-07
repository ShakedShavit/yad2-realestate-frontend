import React from 'react';

function HiddenSelect({ options, setChosenOption, selectClassName, setIsSelectOpen = () => {} }) {
    return (
        <select
            onFocus={() => { setIsSelectOpen(true); }}
            className={"hidden-select " + selectClassName}
            onChange={(e) => { setChosenOption(e.target.value); }}
            onBlur={() => { setIsSelectOpen(false); }}
        >
            { options.map((option, index) => {
                return (<option key={index} value={option}>{option}</option>)
            })}
        </select>
    );
}

export default HiddenSelect;