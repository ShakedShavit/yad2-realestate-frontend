import React, { useEffect, useState } from 'react';
import SelectInput from './SelectInput';
import DividerLine from './types_selector/DividerLine';

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
        if (!minRef.current || !maxRef.current) return;

        if (minVal === 'הכל' || minVal === '') {
            minRef.current.value = '';
            return setMaxOptions([...initOptions]);
        }
        
        const optionIndex = initOptions.indexOf(Number(minVal));
        setMaxOptions(initOptions.slice(optionIndex));

        minRef.current.value = minVal;
    }, [minVal]);

    useEffect(() => {
        if (!minRef.current || !maxRef.current) return;

        if (maxVal === 'הכל'|| maxVal === '') {
            maxRef.current.value = '';
            return setMinOptions([...initOptions]);
        }
        
        const optionIndex = initOptions.indexOf(Number(maxVal));
        setMinOptions(initOptions.slice(0, optionIndex + 1));

        maxRef.current.value = maxVal;
    }, [maxVal]);

    return (
        <div className="double-select__container" onClick={(e) => { e.stopPropagation(); }}>
            <SelectInput
                inputRef={minRef}
                placeholder={"מ-"}
                options={minOptions}
                setChosenOption={setMinVal}
                selectClassName={"min-price-select"}
                isSelectOpen={isMinSelectOpen}
                setIsSelectOpen={setIsMinSelectOpen}
            />
            <DividerLine />
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