import React from 'react';

function NumRangeInputs({ firstPlaceholder, firstRef, secondPlaceholder, secondRef }) {
    const numInputOnChange = (ref) => {
        ref.current.value = ref.current.value.replace(/[^0-9]+/g, '');
    }

    return (
        <div className="num-range-inputs__container">
            <input
                placeholder={"מ-"}
                ref={firstRef}
                onChange={() => { numInputOnChange(firstRef); }}
            />
            <div className="separation-line"></div>
            <input
                placeholder={"עד-"}
                ref={secondRef}
                onChange={() => { numInputOnChange(secondRef); }}
            />
        </div>
    );
}

export default NumRangeInputs;