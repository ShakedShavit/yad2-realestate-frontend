import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ExpandButton from './ExpandButton';
import IconAndTextBtn from './IconAndTextBtn';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ExpandArrow from './ExpandArrow';
import Select from './types_selector/Select';
import AutoCompleteInput from '../../apartments/publish/AutoCompleteInput';
import AdvancedFeatures from './advanced_features/AdvanedFeatures';
import NumRangeInputs from './NumRangeInputs';
import NumSelections from './NumSelections';

function AdvancedSearch(props) {
    const [isBasicSearchOpen, setIsBasicSearchOpen] = useState(true); //!CHANGE TO FALSE
    const [areAdvancedFeaturesOpen, setAreAdvancedFeaturesOpen] = useState(false);

    const apartmentTypes = ['דירה', 'דירת גן', 'גג/פנטהאוז', 'דופלקס', 'דירת נופש', 'מרתף/פרטר', 'טריפלקס', 'יחידת דיור', 'סטודיו/לופט'];
    const houseTypes = ['בית פרטי/קוטג,', 'דו משפחתי', 'משק חקלאי/נחלה', 'משק עזר'];
    const extraTypes = ['מגרשים', 'דיור מוגן', 'בניין מגורים', 'מחסן', 'חניה', 'קב, רכישה/ זכות לנכס', 'כללי'];
    const initRoomsNumOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];

    const [chosenLocation, setChosenLocation] = useState('');

    const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
    const [chosenApartmentTypes, setChosenApartmentTypes] = useState([]);
    const [chosenHouseTypes, setChosenHouseTypes] = useState([]);
    const [chosenExtraTypes, setChosenExtraTypes] = useState([]);

    const [isRoomNumSelectOpen, setIsRoomNumSelectOpen] = useState(false);
    const [minRoomsOptions, setMinRoomsOptions] = useState(initRoomsNumOptions);
    const [maxRoomsOptions, setMaxRoomsOptions] = useState(initRoomsNumOptions);
    const [minRoomsVal, setMinRoomsVal] = useState(0);
    const [maxRoomsVal, setMaxRoomsVal] = useState(0);

    const locationRef = useRef(null);

    const typeRef = useRef(null);

    const roomsNumRef = useRef(null);
    const minRoomsNumRef = useRef(null);
    const maxRoomsNumRef = useRef(null);
    const minPriceRef = useRef(null);
    const maxPriceRef = useRef(null);

    useEffect(() => {
        axios.get('../../allLocals.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
            .then((response) => {
                locationRef.current = response.data;
            });
    }, []);

    useEffect(() => {
        if (!isBasicSearchOpen) setIsRoomNumSelectOpen(false);
    }, [isBasicSearchOpen]);

    useEffect(() => {
        if (!typeRef.current) return;

        const chosenTypes = [...chosenApartmentTypes, ...chosenHouseTypes, ...chosenExtraTypes];
        const chosenTypesLen = chosenTypes.length;
        if (chosenTypesLen === 0) return typeRef.current.value = '';
        if (chosenTypesLen === 1) return typeRef.current.value = chosenTypes[0];
        typeRef.current.value = `${chosenTypesLen} סוגי נכסים`;
    }, [chosenApartmentTypes, chosenHouseTypes, chosenExtraTypes]);

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
        setIsTypeSelectOpen(false);
        setIsRoomNumSelectOpen(false);
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
                <form onSubmit={searchOnSubmit}>
                    <label>חפשו עיר או רחוב </label>
     
                    <AutoCompleteInput
                        allOptionsListRef={locationRef}
                        setChosenOption={setChosenLocation}
                        chosenOption={chosenLocation}
                        isDisabled={false}
                        placeHolder={"לדוגמה: הרצליה"}
                    />

                    <label>סוג נכס </label>
                    <div className="div-input" onClick={(e) => {  e.stopPropagation(); setIsTypeSelectOpen(!isTypeSelectOpen); }}>
                        <input className="fake-input" ref={typeRef} placeholder="בחרו סוגי נכסים" />
                        
                        <ExpandArrow isExpanded={isTypeSelectOpen} />

                        { isTypeSelectOpen &&
                            <div
                                className="select-container types-select-container"
                                onClick={(e) => {  e.stopPropagation(); }}
                            >
                                <Select
                                    options={apartmentTypes}
                                    chosenOptions={chosenApartmentTypes}
                                    setChosenOptions={setChosenApartmentTypes}
                                    value={"דירות"}
                                />
                                <Select
                                    options={houseTypes}
                                    chosenOptions={chosenHouseTypes}
                                    setChosenOptions={setChosenHouseTypes}
                                    value={"בתים"}
                                />
                                <Select
                                    options={extraTypes}
                                    chosenOptions={chosenExtraTypes}
                                    setChosenOptions={setChosenExtraTypes}
                                    value={"סוגים נוספים"}
                                />

                                <div className="types-select-footer">
                                    <span className="link-span" onClick={() => { setIsTypeSelectOpen(false); }}>בחירה</span>
                                </div>
                            </div>
                        }
                    </div>

                    <label>חדרים</label>
                    <div className="div-input" onClick={(e) => {  e.stopPropagation(); setIsRoomNumSelectOpen(!isRoomNumSelectOpen); }}>
                        <input className="fake-input" ref={roomsNumRef} placeholder="חדרים" />
                        
                        <ExpandArrow isExpanded={isRoomNumSelectOpen} />

                        { isRoomNumSelectOpen &&
                            <NumSelections
                                minRef={minRoomsNumRef}
                                maxRef={maxRoomsNumRef}
                                minVal={minRoomsVal}
                                maxVal={maxRoomsVal}
                                setMinVal={setMinRoomsVal}
                                setMaxVal={setMaxRoomsVal}
                                minOptions={minRoomsOptions}
                                setMinOptions={setMinRoomsOptions}
                                maxOptions={maxRoomsOptions}
                                setMaxOptions={setMaxRoomsOptions}
                                initOptions={initRoomsNumOptions}
                            />
                        }
                    </div>

                    <label>מחיר</label>
                    <NumRangeInputs
                        firstPlaceholder={"ממחיר"}
                        firstRef={minPriceRef}
                        secondPlaceholder={"עד מחיר"}
                        secondRef={maxPriceRef}
                    />
                    
                    <ExpandButton
                        isExpanded={areAdvancedFeaturesOpen}
                        setIsExpand={setAreAdvancedFeaturesOpen}
                        text={"מתקדם חיפוש"}
                    />
                    { areAdvancedFeaturesOpen && 
                        <AdvancedFeatures />
                    }

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