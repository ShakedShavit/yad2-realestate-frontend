import React, { useEffect, useState } from 'react';
import SelectInput from './SelectInput';

function NumSelections({
    minRef,
    maxRef,
    minVal,
    maxVal,
    setMinVal,
    setMaxVal,
    minOptions,
    setMinOptions,
    maxOptions,
    setMaxOptions,
    initOptions
}) {
    const [isMinSelectOpen, setIsMinSelectOpen] = useState(false);
    const [isMaxSelectOpen, setIsMaxSelectOpen] = useState(false);

    useEffect(() => {
        if (!minRef.current || !maxRef.current || minVal === 0) return;

        if (minVal === 'הכל') {
            minRef.current.value = '';
            return setMaxOptions([...initOptions]);
        }
        
        const optionIndex = initOptions.indexOf(Number(minVal));
        setMaxOptions(initOptions.slice(optionIndex));

        minRef.current.value = minVal;
    }, [minVal]);

    useEffect(() => {
        console.log(maxVal);

        if (!minRef.current || !maxRef.current || maxVal === 0) return;

        if (maxVal === 'הכל') {
            maxRef.current.value = '';
            return setMinOptions([...initOptions]);
        }
        
        const optionIndex = initOptions.indexOf(Number(maxVal));
        setMinOptions(initOptions.slice(0, optionIndex + 1));

        maxRef.current.value = maxVal;
    }, [maxVal]);

    return (
        <div className="select-container room-num-selects__container" onClick={(e) => { e.stopPropagation(); }}>
            <SelectInput
                inputRef={minRef}
                placeholder={"מ-"}
                options={minOptions}
                setChosenOption={setMinVal}
                selectClassName={"min-price-select"}
                isSelectOpen={isMinSelectOpen}
                setIsSelectOpen={setIsMinSelectOpen}
            />
            <SelectInput
                inputRef={maxRef}
                placeholder={"עד-"}
                options={maxOptions}
                setChosenOption={setMaxVal}
                selectClassName={"max-price-select"}
                isSelectOpen={isMaxSelectOpen}
                setIsSelectOpen={setIsMaxSelectOpen}
            />
        </div>
    );
}

export default NumSelections;