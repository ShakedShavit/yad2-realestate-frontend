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
import { newSearchParamsAction } from '../../../actions/searchParamsActions';

const addRangeQueryToObject = (object, key, minValue, maxValue) => {
    if (!!minValue) object[`min-${key}`] = minValue;
    if (!!maxValue) object[`max-${key}`] = maxValue;
}

function AdvancedSearch({ dispatchSearchParamsData }) {
    const [isBasicSearchOpen, setIsBasicSearchOpen] = useState(false);
    const [areAdvancedFeaturesOpen, setAreAdvancedFeaturesOpen] = useState(false);
    const [extraFeaturesBtnTxt, setExtraFeaturesBtnTxt] = useState("חיפוש מתקדם");
    const [chosenFeaturesCounter, setChosenFeaturesCounter] = useState(0);

    const apartmentTypes = ['דירה', 'דירת גן', 'גג/פנטהאוז', 'דופלקס', 'דירת נופש', 'מרתף/פרטר', 'טריפלקס', 'יחידת דיור', 'סטודיו/לופט'];
    const houseTypes = ['בית פרטי/קוטג,', 'דו משפחתי', 'משק חקלאי/נחלה', 'משק עזר'];
    const extraTypes = ['מגרשים', 'דיור מוגן', 'בניין מגורים', 'מחסן', 'חניה', 'כללי'];
    const apartmentTypesEn = ['apartment', 'garden-apartment', 'rooftop/penthouse', 'duplex', 'vacation-apartment', 'basement/parterre', 'triplex', 'residential-unit', 'studio/loft'];
    const houseTypesEn = ['private-house/cottage', 'two-family-dwelling', 'farm/estate', 'auxiliary-farm'];
    const extraTypesEn = ['lots', 'protected-accommodation', 'residential-building', 'garage', 'parking', 'general'];
    const initRoomsNumOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
    const properties = ['דלתות פנדור', 'חניה', 'מעלית', 'מיזוג', 'מרפסת', 'ממ"ד', 'סורגים', 'מחסן', 'גישה לנכים', 'משופצת', 'מרוהטת', 'בבלעדיות'];
    const propertiesEn = ['hasPandorDoors', 'numberOfParkingSpots', 'hasLift', 'hasAirConditioning', 'numberOfBalconies', 'hasSafeRoom', 'hasWindowBars', 'hasShed', 'isAccessible', 'isRenovated', 'hasFurniture'];

    const [chosenLocation, setChosenLocation] = useState('');

    const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);
    const [chosenApartmentTypes, setChosenApartmentTypes] = useState([]);
    const [chosenHouseTypes, setChosenHouseTypes] = useState([]);
    const [chosenExtraTypes, setChosenExtraTypes] = useState([]);

    const [isRoomNumSelectOpen, setIsRoomNumSelectOpen] = useState(false);
    const [minRoomsOptions, setMinRoomsOptions] = useState(initRoomsNumOptions);
    const [maxRoomsOptions, setMaxRoomsOptions] = useState(initRoomsNumOptions);
    const [minRoomsVal, setMinRoomsVal] = useState('');
    const [maxRoomsVal, setMaxRoomsVal] = useState('');

    const [chosenProperties, setChosenProperties] = useState([]);
    const [minFloorsVal, setMinFloorsVal] = useState('');
    const [maxFloorsVal, setMaxFloorsVal] = useState('');
    const [minSizeVal, setMinSizeVal] = useState('');
    const [maxSizeVal, setMaxSizeVal] = useState('');
    const [isEntranceImmediate, setIsEntranceImmediate] = useState(false);
    const [entranceDate, setEntranceDate] = useState('');
    const [freeSearchVal, setFreeSearchVal] = useState('');

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
        if (chosenFeaturesCounter === 0) return setExtraFeaturesBtnTxt("חיפוש מתקדם");
        setExtraFeaturesBtnTxt(`חיפוש מתקדם (${chosenFeaturesCounter})`);
    }, [chosenFeaturesCounter]);

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

    useEffect(() => {
        let counter = chosenProperties.length;
        if ((!!minFloorsVal && minFloorsVal !== 'הכל') || (!!maxFloorsVal && maxFloorsVal !== 'הכל')) counter++;
        if ((!!minSizeVal && minSizeVal !== 'הכל') || (!!maxSizeVal && maxSizeVal !== 'הכל')) counter++;
        if (isEntranceImmediate || !!entranceDate) counter++;
        if (!!freeSearchVal) counter++;
        setChosenFeaturesCounter(counter);
    }, [chosenProperties, minFloorsVal, maxFloorsVal, minSizeVal, maxSizeVal, isEntranceImmediate, entranceDate, freeSearchVal]);

    const closeOpenDropdown = () => {
        setIsTypeSelectOpen(false);
        setIsRoomNumSelectOpen(false);
    }

    const resetSearchOnClick = () => {
        setChosenFeaturesCounter(0);
        setChosenLocation('');
        setChosenApartmentTypes([]);
        setChosenHouseTypes([]);
        setChosenExtraTypes([]);
        setMinRoomsVal('');
        setMaxRoomsVal('');
        setChosenProperties([]);
        setMinFloorsVal('');
        setMaxFloorsVal('');
        setMinSizeVal('');
        setMaxSizeVal('');
        setIsEntranceImmediate(false);
        setEntranceDate('');
        setFreeSearchVal('');
    }

    const searchOnSubmit = async (e) => {
        e.preventDefault();

        const newQueryParams = {};

        // Location
        if (chosenLocation) {
            let response;
            try {
                response = await axios.get('../../citiesArray.json', {
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                        }
                    });
            } catch (err) {}

            if (!!response) {
                if (response.data.includes(chosenLocation)) newQueryParams.town = chosenLocation;
                else newQueryParams.streetName = chosenLocation;
            }
        }

        // Properties
        const propertiesLen = properties.length;
        for (let i = 0; i < chosenProperties.length; i++) {
            const propertyIndex = properties.indexOf(chosenProperties[i]);
            if (propertyIndex === propertiesLen - 1) continue;
            if (propertyIndex === 1 || propertyIndex === 4) {
                newQueryParams[`min-${propertiesEn[propertyIndex]}`] = 1;
                continue;
            }
            newQueryParams[propertiesEn[propertyIndex]] = true;
        }

        // Types
        newQueryParams.types = [];
        for (let i = 0; i < chosenApartmentTypes.length; i++)
            newQueryParams.types.push(apartmentTypesEn[apartmentTypes.indexOf(chosenApartmentTypes[i])]);
        for (let i = 0; i < chosenHouseTypes.length; i++)
            newQueryParams.types.push(houseTypesEn[houseTypes.indexOf(chosenHouseTypes[i])]);
        for (let i = 0; i < chosenExtraTypes.length; i++)
            newQueryParams.types.push(extraTypesEn[extraTypes.indexOf(chosenExtraTypes[i])]);

        // Number of rooms
        addRangeQueryToObject(newQueryParams, 'numberOfRooms', minRoomsVal, maxRoomsVal);
        // Floor number
        addRangeQueryToObject(newQueryParams, 'floor', minFloorsVal, maxFloorsVal);
        // Size
        addRangeQueryToObject(newQueryParams, 'totalSqm', minSizeVal, maxSizeVal);
        // Price
        addRangeQueryToObject(newQueryParams, 'price', minPriceRef.current?.value, maxPriceRef.current?.value);
        // Entry date
        if (isEntranceImmediate) newQueryParams.isImmediate = true;
        addRangeQueryToObject(newQueryParams, 'date', null, entranceDate);
        // Description
        if (!!freeSearchVal) newQueryParams.description = freeSearchVal;

        dispatchSearchParamsData(newSearchParamsAction(newQueryParams));
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
                            <div className="select-container">
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
                            </div>
                        }
                    </div>

                    <label>מחיר</label>
                    <NumRangeInputs
                        minRef={minPriceRef}
                        maxRef={maxPriceRef}
                    />
                    
                    <ExpandButton
                        isExpanded={areAdvancedFeaturesOpen}
                        setIsExpand={setAreAdvancedFeaturesOpen}
                        text={extraFeaturesBtnTxt}
                        chosenFeaturesCounter={chosenFeaturesCounter}
                    />
                    { areAdvancedFeaturesOpen && 
                        <AdvancedFeatures
                            properties={properties}
                            chosenProperties={chosenProperties}
                            setChosenProperties={setChosenProperties}
                            minFloorsVal={minFloorsVal}
                            setMinFloorsVal={setMinFloorsVal}
                            maxFloorsVal={maxFloorsVal}
                            setMaxFloorsVal={setMaxFloorsVal}
                            setMinSizeVal={setMinSizeVal}
                            setMaxSizeVal={setMaxSizeVal}
                            isEntranceImmediate={isEntranceImmediate}
                            setIsEntranceImmediate={setIsEntranceImmediate}
                            setEntranceDate={setEntranceDate}
                            setFreeSearchVal={setFreeSearchVal}
                        />
                    }

                    <IconAndTextBtn
                        onCLickFunc={searchOnSubmit}
                        btnClassName={"search-btn"}
                        iconClassName={""}
                        icon={faSearch}
                        text={"חיפוש"}
                    />
                    
                    <span className="reset-search-btn" onClick={resetSearchOnClick}>נקה</span>
                </form>
            }
        </div>
    );
}

export default AdvancedSearch;