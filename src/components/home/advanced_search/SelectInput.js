import React from 'react';
import ExpandArrow from './ExpandArrow';
import HiddenSelect from './HiddenSelect';

function SelectInput(props) {
    return (
        <div className="select-input-container">
            <ExpandArrow isExpanded={props.isSelectOpen} />

            <input
                placeholder={props.placeholder}
                ref={props.inputRef}
            />

            <HiddenSelect
                options={['הכל', ...props.options]}
                setChosenOption={props.setChosenOption}
                selectClassName={props.selectClassName}
                setIsSelectOpen={props.setIsSelectOpen}
            />
        </div>
    );
}

export default SelectInput;