import React, { useRef, useState } from 'react';
import EntryDateInput from '../../../main/EntryDateInput';
import NumRangeInputs from '../NumRangeInputs';
import NumSelections from '../NumSelections';
import DividerLine from '../types_selector/DividerLine';
import SelectOption from '../types_selector/SelectOption';

function AdvancedFeatures({
    properties,
    chosenProperties,
    setChosenProperties,
    minFloorsVal,
    setMinFloorsVal,
    maxFloorsVal,
    setMaxFloorsVal,
    setMinSizeVal,
    setMaxSizeVal,
    isEntranceImmediate,
    setIsEntranceImmediate,
    setEntranceDate,
    setFreeSearchVal
}) {
    const initFloorsNumOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    const [minFloorsOptions, setMinFloorsOptions] = useState(initFloorsNumOptions);
    const [maxFloorsOptions, setMaxFloorsOptions] = useState(initFloorsNumOptions);

    const minFloorsRef = useRef(null);
    const maxFloorsRef = useRef(null);
    const minSizeRef = useRef(null);
    const maxSizeRef = useRef(null);

    return (
        <div className="advanced-features-container">
            <DividerLine />

            <section>
                <h3 className="properties-headline">מאפייני הדירה</h3>
                
                <div className="properties-wrapper">
                { properties.map((property, index) => {
                    return (
                        <SelectOption
                            key={index}
                            chosenOptions={chosenProperties}
                            setChosenOptions={setChosenProperties}
                            value={property}
                        />
                    )
                })}
                </div>
            </section>

            <DividerLine />

            <section>
                <label>קומה</label>
                <NumSelections
                    minRef={minFloorsRef}
                    maxRef={maxFloorsRef}
                    minVal={minFloorsVal}
                    maxVal={maxFloorsVal}
                    setMinVal={setMinFloorsVal}
                    setMaxVal={setMaxFloorsVal}
                    minOptions={minFloorsOptions}
                    setMinOptions={setMinFloorsOptions}
                    maxOptions={maxFloorsOptions}
                    setMaxOptions={setMaxFloorsOptions}
                    initOptions={initFloorsNumOptions}
                />

                <label>גודל דירה (במ"ר)</label>
                <NumRangeInputs
                    minRef={minSizeRef}
                    maxRef={maxSizeRef}
                    setMinVal={setMinSizeVal}
                    setMaxVal={setMaxSizeVal}
                />
            </section>

            <DividerLine />

            <section>
                <label>תאריך כניסה</label>
                <EntryDateInput
                    isEntranceImmediate={isEntranceImmediate}
                    setIsEntranceImmediate={setIsEntranceImmediate}
                    setEntranceDate={setEntranceDate}
                />
            </section>

            <DividerLine />

            <section>
                <label>חיפוש חופשי</label>
                <input
                    type="text"
                    onChange={(e) => { setFreeSearchVal(e.target.value) }}
                    className="free-search-input"
                />
            </section>

            <DividerLine />
        </div>
    );
}

export default AdvancedFeatures;