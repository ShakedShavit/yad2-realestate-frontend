import React, { useEffect, useRef, useState } from 'react';

function AutoCompleteInput({ allOptionsListRef, setChosenOption, chosenOption, isDisabled, placeHolder }) {
    const [inputClassList, setInputClassList] = useState('');
    const [optionsList, setOptionsList] = useState([]);
    const [hasFocusedOnInputYet, setHasFocusedOnInputYet] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        const resetOptionsList = () => { setOptionsList([]); }

        window.addEventListener('click', resetOptionsList);
        return (() => {
            window.removeEventListener('click', resetOptionsList);
        });
    });

    const inputOnChange = async (e) => {
        setChosenOption('');

        const inputVal = e.target.value;
        const inputLen = inputVal.length;
        if (inputLen < 2) return setOptionsList([]);;
        
        let possibleOptions = [];
        allOptionsListRef.current?.forEach((option) => {
            if (option.substring(0, inputLen) === inputVal) possibleOptions.push(option);
        });
        setOptionsList(possibleOptions);
    }

    const chooseOptionOnClick = (value) => {
        inputRef.current.value = value;
        setChosenOption(value);
        setOptionsList([]);
        setInputClassList('');
    }

    const inputOnFocus = () => {
        setInputClassList('blue-border-input');
        setHasFocusedOnInputYet(true);
    }
    const inputOnBlur = () => {
        setInputClassList('');
        if (!chosenOption) inputRef.current.value = '';
    }

    useEffect(() => {
        if (optionsList.length > 0) return setInputClassList('blue-border-input blue-border-input__with-options');
        setInputClassList(inputClassList.replace('blue-border-input__with-options', ''));
    }, [optionsList.length, hasFocusedOnInputYet]);

    return (
        <div className="auto-complete-wrapper">
        <input
            className={inputClassList}
            ref={inputRef}
            type="text"
            onFocus={inputOnFocus}
            onBlur={inputOnBlur}
            onChange={inputOnChange}
            disabled={isDisabled}
            placeholder={placeHolder}
        />

        { optionsList.length > 0 &&
            <div className="input-options-container">
            { optionsList.map((option, index) => {
                return (
                <div
                    key={index}
                    onClick={() => { chooseOptionOnClick(optionsList[index]); }}
                    className="location-input-option"
                >
                    <b>{option.substring(0, inputRef.current.value.length)}</b>
                    {
                        (option[inputRef.current.value.length - 1] === ' ' || option[inputRef.current.value.length] === ' ')
                        && <span>&#160;</span>
                    }
                    <span>{option.substring(inputRef.current.value.length)}</span>
                </div>)
            })}
            </div>
        }
        </div>
    );
}

export default AutoCompleteInput;