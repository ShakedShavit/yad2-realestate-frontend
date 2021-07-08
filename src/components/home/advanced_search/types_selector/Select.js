import React, { useEffect, useState } from 'react';
import ExpandArrow from '../ExpandArrow';
import DividerLine from './DividerLine';
import SelectOption from './SelectOption';

function Select({ options, chosenOptions, setChosenOptions, value }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSelectSelected, setIsSelectSelected] = useState([]);

    useEffect(() => {
        const optionsLen = options.length;
        if (optionsLen === 0) return;
        const chosenOptionsLen = chosenOptions.length;
        const isSelectSelectedBool = isSelectSelected.length > 0;
        const areAllOptionsSelected = chosenOptionsLen === optionsLen;
        if (areAllOptionsSelected && !isSelectSelectedBool) return setIsSelectSelected([value]);
        if (!areAllOptionsSelected && isSelectSelectedBool) setIsSelectSelected([]);
    }, [chosenOptions, options]);

    const selectOnClick = () => {
        if (isSelectSelected.length > 0)
            return setChosenOptions([]);
        setChosenOptions([...options]);
    }

    return (
        <>
        <div className="apartment-type-select">
            <div onClick={selectOnClick}>
            <SelectOption
                value={value}
                chosenOptions={isSelectSelected}
                setChosenOptions={setIsSelectSelected}
            />
            </div>

            <span>
            { chosenOptions.length > 0 ?
                `נבחרו ${chosenOptions.length} סוגים` : ''
            }
            </span>

            <div
                className="select-open-container"
                onClick={() => { setIsExpanded(!isExpanded); }}
            >
                <ExpandArrow isExpanded={isExpanded} />
            </div>
        </div>

        <div className="options-container">
        { isExpanded &&
            options.map((option, index) => {
                return (
                    <React.Fragment key={index}>
                        <SelectOption
                            value={option}
                            chosenOptions={chosenOptions}
                            setChosenOptions={setChosenOptions}
                        />
                        { index !== options.length - 1 &&
                            <DividerLine />
                        }
                    </React.Fragment>
                )
            })
        }
        </div>
        </>
    );
}

export default Select;