import React from 'react';

function SelectOption({ value, isDefaultValue }) {
    return (
        <option className={isDefaultValue ? "form-select-option default-option" : "form-select-option"}>
            {value}
        </option>
    );
}

export default SelectOption;