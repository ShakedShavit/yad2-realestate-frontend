import React from 'react';

function NumRangeInputs({ minRef, maxRef, setMinVal = () => {}, setMaxVal = () => {} }) {
    const numInputOnChange = (ref) => {
        ref.current.value = ref.current.value.replace(/[^0-9]+/g, '');
    }

    return (
        <div className="num-range-inputs__container">
            <input
                placeholder={"מ-"}
                ref={minRef}
                onChange={() => { numInputOnChange(minRef); setMinVal(minRef.current.value); }}
            />
            <div className="separation-line"></div>
            <input
                placeholder={"עד-"}
                ref={maxRef}
                onChange={() => { numInputOnChange(maxRef); setMaxVal(maxRef.current.value); }}
            />
        </div>
    );
}

export default NumRangeInputs;