import React, { useEffect, useRef, useState } from 'react';
import ExpandButton from './ExpandButton';
import IconAndTextBtn from './IconAndTextBtn';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ExpandArrow from './ExpandArrow';
import SelectInput from './SelectInput';

function AdvancedSearch(props) {
    const [isBasicSearchOpen, setIsBasicSearchOpen] = useState(true); //!CHANGE TO FALSE

    const apartmentTypes = ['דירה', 'דירת גן', 'גג\פנטהאוז', 'דופלקס', 'דירת נופש', 'מרתף\פרטר', 'טריפלקס', 'יחידת דיור', 'סטודיו\לופט'];
    const houseTypes = ['בית פרטי\קוטג,', 'דו משפחתי', 'משק חקלאי\נחלה', 'משק עזר'];
    const extraTypes = ['מגרשים', 'דיור מוגן', 'בניין מגורים', 'מחסן', 'חניה', 'קב, רכישה\ זכות לנכס', 'כללי'];
    const initRoomsNumOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

    const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
    const [chosenApartmentTypes, setChosenApartmentTypes] = useState([]);
    const [chosenHouseTypes, setChosenHouseTypes] = useState([]);
    const [chosenExtraTypes, setChosenExtraTypes] = useState([]);

    const [isRoomNumSelectOpen, setIsRoomNumSelectOpen] = useState(false);
    const [minRoomsOptions, setMinRoomsOptions] = useState(initRoomsNumOptions);
    const [maxRoomsOptions, setMaxRoomsOptions] = useState(initRoomsNumOptions);
    const [minRoomsVal, setMinRoomsVal] = useState(0);
    const [maxRoomsVal, setMaxRoomsVal] = useState(0);
    const [isMinRoomSelectOpen, setIsMinRoomSelectOpen] = useState(false);
    const [isMaxRoomSelectOpen, setIsMaxRoomSelectOpen] = useState(false);

    const typeRef = useRef(null);

    const roomsNumRef = useRef(null);
    const minRoomsNumRef = useRef(null);
    const maxRoomsNumRef = useRef(null);
    const minPriceRef = useRef(null);
    const maxPriceRef = useRef(null);

    useEffect(() => {
        if (!isBasicSearchOpen) setIsRoomNumSelectOpen(false);
    }, [isBasicSearchOpen]);

    useEffect(() => {
        if (!isRoomNumSelectOpen || !minRoomsNumRef.current || !maxRoomsNumRef.current || minRoomsVal === 0) return;

        if (minRoomsVal === 'הכל') {
            minRoomsNumRef.current.value = '';
            return setMaxRoomsOptions([...initRoomsNumOptions]);
        }
        
        const optionIndex = initRoomsNumOptions.indexOf(Number(minRoomsVal));
        setMaxRoomsOptions(initRoomsNumOptions.slice(optionIndex));

        minRoomsNumRef.current.value = minRoomsVal;
    }, [minRoomsVal, isRoomNumSelectOpen]);

    useEffect(() => {
        if (!isRoomNumSelectOpen || !minRoomsNumRef.current || !maxRoomsNumRef.current || maxRoomsVal === 0) return;

        if (maxRoomsVal === 'הכל') {
            maxRoomsNumRef.current.value = '';
            return setMinRoomsOptions([...initRoomsNumOptions]);
        }
        
        const optionIndex = initRoomsNumOptions.indexOf(Number(maxRoomsVal));
        setMinRoomsOptions(initRoomsNumOptions.slice(0, optionIndex + 1));

        maxRoomsNumRef.current.value = maxRoomsVal;
    }, [maxRoomsVal, isRoomNumSelectOpen]);

    useEffect(() => {
        if (!minRoomsNumRef.current || !maxRoomsNumRef.current || !roomsNumRef.current) return;

        const isMinRoomsSpecified = !(minRoomsVal === 'הכל' || minRoomsVal === 0);
        const isMaxRoomsSpecified = !(maxRoomsVal === 'הכל' || maxRoomsVal === 0);

        if (!isMinRoomsSpecified && !isMaxRoomsSpecified)
            return roomsNumRef.current.value = '';
        if (isMinRoomsSpecified && !isMaxRoomsSpecified)
            return roomsNumRef.current.value = `מ - ${minRoomsVal}`;
        if (!isMinRoomsSpecified && isMaxRoomsSpecified)
            return roomsNumRef.current.value = `עד - ${maxRoomsVal}`;
        roomsNumRef.current.value = `${minRoomsVal} - ${maxRoomsVal}`;
    }, [minRoomsVal, maxRoomsVal]);

    const closeOpenDropdown = () => {
        setIsRoomNumSelectOpen(false);
    }

    const numInputOnChange = (ref) => {
        ref.current.value = ref.current.value.replace(/[^0-9]+/g, '');
    }

    const searchOnSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="advanced-search" onClick={closeOpenDropdown}>
            <h3>איזה נכס ל<span className="link-span">מכירה</span> תרצו לחפש?</h3>
        
            <ExpandButton
                isExpanded={isBasicSearchOpen}
                setIsExpand={setIsBasicSearchOpen}
                text={"פתח חיפוש"}
            />
        
            { isBasicSearchOpen &&
                <form>
                    <label>חפשו עיר או רחוב </label>
                    <input
                        placeholder="לדוגמה: הרצליה"
                    />

                    <label>סוג נכס </label>
                    <div className="div-input" onClick={(e) => {  e.stopPropagation(); setIsTypeSelectOpen(!isRoomNumSelectOpen); }}>
                        <input className="fake-input" ref={typeRef} placeholder="בחרו סוגי נכסים" />
                        
                        <ExpandArrow isExpanded={isTypeSelectOpen} />

                        { isTypeSelectOpen &&
                            <></>
                        }
                    </div>

                    <label>חדרים</label>
                    <div className="div-input" onClick={(e) => {  e.stopPropagation(); setIsRoomNumSelectOpen(!isRoomNumSelectOpen); }}>
                        <input className="fake-input" ref={roomsNumRef} placeholder="חדרים" />
                        
                        <ExpandArrow isExpanded={isRoomNumSelectOpen} />

                        { isRoomNumSelectOpen &&
                            <div className="select-container room-num-selects__container" onClick={(e) => { e.stopPropagation(); }}>
                                <SelectInput
                                    inputRef={minRoomsNumRef}
                                    placeholder={"מ-"}
                                    options={minRoomsOptions}
                                    setChosenOption={setMinRoomsVal}
                                    selectClassName={"min-price-select"}
                                    isSelectOpen={isMinRoomSelectOpen}
                                    setIsSelectOpen={setIsMinRoomSelectOpen}
                                />
                                <SelectInput
                                    inputRef={maxRoomsNumRef}
                                    placeholder={"עד-"}
                                    options={maxRoomsOptions}
                                    setChosenOption={setMaxRoomsVal}
                                    selectClassName={"max-price-select"}
                                    isSelectOpen={isMaxRoomSelectOpen}
                                    setIsSelectOpen={setIsMaxRoomSelectOpen}
                                />
                            </div>
                        }
                    </div>

                    <label>מחיר</label>
                    <div>
                        <input
                            placeholder="ממחיר"
                            ref={minPriceRef}
                            onChange={() => { numInputOnChange(minPriceRef); }}
                        />
                        <input
                            placeholder="עד מחיר"
                            ref={maxPriceRef}
                            onChange={() => { numInputOnChange(maxPriceRef); }}
                        />
                    </div>



                    <IconAndTextBtn
                        onCLickFunc={searchOnSubmit}
                        btnClassName={"search-btn"}
                        iconClassName={""}
                        icon={faSearch}
                        text={"חיפוש"}
                    />
                </form>
            }
        </div>
    );
}

export default AdvancedSearch;