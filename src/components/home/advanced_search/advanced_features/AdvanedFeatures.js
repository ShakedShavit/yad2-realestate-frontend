import React, { useRef, useState } from 'react';
import NumRangeInputs from '../NumRangeInputs';
import DividerLine from '../types_selector/DividerLine';
import SelectOption from '../types_selector/SelectOption';

function AdvancedFeatures(props) {
    const properties = ['דלתות פנדור', 'חניה', 'מעלית', 'מיזוג', 'מרפסת', 'ממ"ד', 'סורגים', 'מחסן', 'גישה לנכים', 'משופצת', 'מרוהטת', 'בבלעדיות'];

    const [chosenProperties, setChosenProperties] = useState([]);

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
                

                <label>גודל דירה (במ"ר)</label>
                <NumRangeInputs
                    firstRef={minSizeRef}
                    secondRef={maxSizeRef}
                />
            </section>
        </div>
    );
}

export default AdvancedFeatures;