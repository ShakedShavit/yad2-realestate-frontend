import React, { useEffect, useState } from 'react';
import CheckBox from './CheckBox';

function EntryDateInput({
    isEntranceImmediate,
    setIsEntranceImmediate,
    setEntranceDate
}) {
    const [minDate, setMinDate] = useState();
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const date = new Date();
        const dateDay = date.getDate();
        const dateMonth = date.getMonth() + 1;
        const day = (`${dateDay}`).length === 1 ? "0" + dateDay : dateDay;
        const month = (`${dateMonth}`).length === 1 ? "0" + dateMonth : dateMonth;
        setMinDate(`${date.getFullYear()}-${month}-${day}`);
    }, []);

    useEffect(() => {
        console.log(minDate);

    }, [minDate])

    return (
        <div className="entry-date-inputs__container">
            <input
                type="date"
                min={minDate}
                disabled={isEntranceImmediate}
                onChange={(e) => { setEntranceDate(e.target.value) }}
            />

            <div
                className="checkbox-container"
                onMouseEnter={() => { setIsHovering(true); }}
                onMouseLeave={() => { setIsHovering(false); }}
                onClick={() => { setIsEntranceImmediate(!isEntranceImmediate) }}
            >
                <CheckBox
                    isChecked={isEntranceImmediate}
                    isHovered={isHovering}
                />
                <span>כניסה מיידית</span>
            </div>
        </div>
    );
}

export default EntryDateInput;