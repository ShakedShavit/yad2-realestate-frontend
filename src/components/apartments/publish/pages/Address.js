import React, { useEffect, useRef, useState } from 'react';
import PageFooter from './PageFooter';
import videoIcon from '../../../../images/video-icon.png';
import axios from 'axios';
import AutoCompleteInput from '../AutoCompleteInput';
import SelectOption from '../SelectOption';
import PublishInputErrMsg from '../PublishInputErrMsg';
import AdviceMessage from '../AdviceMessage';

function Address(props) {
    const [chosenCity, setChosenCity] = useState('');
    const [chosenStreet, setChosenStreet] = useState(''); 
    const [allStreetsListState, setAllStreetsListState] = useState([]);

    const allCitiesListRef = useRef([]);
    const allStreetsListRef = useRef([]);

    const [apartmentType, setApartmentType] = useState('');
    const [apartmentCondition, setApartmentCondition] = useState('');
    const [houseNum, setHouseNum] = useState('');
    const [floorNum, setFloorNum] = useState('');
    const [maxFloors, setMaxFloors] = useState('');
    const [isOnPolls, setIsOnPolls] = useState(false);

    const [cityErrMsg, setCityErrMsg] = useState('');
    const [streetErrMsg, setStreetErrMsg] = useState('');
    const [apartmentTypeErrMsg, setApartmentTypeErrMsg] = useState('');
    const [apartmentConditionErrMsg, setApartmentConditionErrMsg] = useState('');
    const [houseNumErrMsg, setHouseNumErrMsg] = useState('');
    const [floorNumErrMsg, setFloorNumErrMsg] = useState('');
    const [maxFloorsErrMsg, setMaxFloorsErrMsg] = useState('');

    const emptyFieldErrMsg = "שדה חובה";
    const apartmentTypesHebrew = [
        "דירה",
        "דירת גן",
        "בית פרטי/קוטג'",
        "גג/פנטהאוז",
        "מגרשים",
        "דופלקס",
        "דירת נופש",
        "דו משפחתי",
        "מרתף/פרטר",
        "טריפלקס",
        "יחידת דיור",
        "משק חקלאי/נחלה",
        "משק עזר",
        "דיור מוגן",
        "בניין מגורים",
        "סטודיו/לופט",
        "מחסן",
        "קב' רכישה/זכות לנכס",
        "חניה",
        "כללי"
    ];
    const apartmentConditionsHebrew = [
        "חדש מקבלן (לא גרו בו בכלל)",
        "חדש (נכס בן עד 5 שנים)",
        "משופץ (שופץ ב5 השנים האחרונות)",
        "במצב שמור (במצב טוב, לא שופץ)",
        "דרוש שיפוץ (זקוק לעבודת שיפוץ)"
    ];
    const apartmentTypesEn = [
        'apartment',
        'garden-apartment',
        'private-house/cottage',
        'rooftop/penthouse',
        'lots',
        'duplex',
        'vacation-apartment',
        'two-family-dwelling',
        'basement/parterre',
        'triplex',
        'residential-unit',
        'farm/estate',
        'auxiliary-farm',
        'protected-accommodation',
        'residential-building',
        'studio/loft',
        'garage',
        'parking',
        'general'
    ];
    const apartmentConditionEn = [
        'brand-new',
        'new',
        'renovated',
        'good',
        'in-need-of-renovation'
    ];

    useEffect(() => {
        props.setTitle('כתובת הנכס');

        axios.get(`${process.env.REACT_APP_ROOT_URL}locations/cities`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
            .then((response) => {
                allCitiesListRef.current = response.data;
            });
    }, []);

    useEffect(() => {
        setStreetErrMsg('');
        if (!chosenCity) return setAllStreetsListState([]);

        axios.get(`${process.env.REACT_APP_ROOT_URL}locations/streets-graph?city=${chosenCity}`, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data);
                const newOptions = response.data || [];
                allStreetsListRef.current = newOptions;
                setAllStreetsListState(newOptions);
            })
            .catch((err) => { setAllStreetsListState([]); });
    }, [chosenCity]);

    const validateFormOnClick = () => {
        let isFormValid = true;

        if (chosenCity === '') {
            setCityErrMsg('יש לבחור ישוב מתוך הרשימה');
            isFormValid = false;
        }
        if (chosenStreet === '' && allStreetsListState.length !== 0) {
            setStreetErrMsg('יש לבחור רחוב מתוך הרשימה');
            isFormValid = false;
        }
        if (apartmentType === '') {
            setApartmentTypeErrMsg('שדה חובה סוג הנכס');
            isFormValid = false;
        }
        if (apartmentCondition === '') {
            setApartmentConditionErrMsg('שדה חובה מצב הנכס');
            isFormValid = false;
        }
        if (houseNum === '') {
            setHouseNumErrMsg(emptyFieldErrMsg);
            isFormValid = false;
        }
        if (floorNum === '') {
            setFloorNumErrMsg(emptyFieldErrMsg);
            isFormValid = false;
        }
        if (maxFloors === '') {
            setMaxFloorsErrMsg(emptyFieldErrMsg);
            isFormValid = false;
        }

        if (isFormValid) props.setFinishedInfo(`${apartmentType} - ${chosenCity}` + (!!chosenStreet ? ` - ${chosenStreet}` : ''));
        else props.setFinishedInfo('');

        return { isFormValid, newProperties: isFormValid ? {
            'town': chosenCity,
            'streetName': chosenStreet,
            'houseNum': houseNum,
            'floor': floorNum,
            'buildingMaxFloor': maxFloors,
            'isStandingOnPolls': isOnPolls,
            'type': apartmentTypesEn[apartmentTypesHebrew.indexOf(apartmentType)],
            'condition': apartmentConditionEn[apartmentConditionsHebrew.indexOf(apartmentCondition)]
        } : {} };
    }

    return (
        <>
        { props.isCurrPage &&
            <div className="publish-page-content publish-address-page">
                <AdviceMessage
                    img={videoIcon}
                    imgAlt={"video-icon"}
                    title={"המלצה שלנו"}
                    message={"העלאת וידאו של הנכס תמשוך יותר מתעניינים למודעה שלך"}
                />

                <form className="form-body address-form">
                    <label>סוג הנכס<b>*</b></label>
                    <select onChange={(e) => { setApartmentType(e.target.value); }}>
                    { ["דירה או אולי פנטהאוז?", ...apartmentTypesHebrew].map((typeStr, index) => {
                        return (
                            <SelectOption
                                value={typeStr}
                                isDefaultValue={index === 0}
                                key={index}
                            />
                        );
                    })}
                    </select>
                    <PublishInputErrMsg errMsg={apartmentTypeErrMsg} setErrMsg={setApartmentTypeErrMsg} inputValue={apartmentType} />

                    <label>מצב הנכס<b>*</b></label>
                    <select onChange={(e) => { setApartmentCondition(e.target.value); }}>
                    { ["משופץ? חדש מקבלן?", ...apartmentConditionsHebrew].map((conditionStr, index) => {
                        return (
                            <SelectOption
                                value={conditionStr}
                                isDefaultValue={index === 0}
                                key={index}
                            />
                        );
                    })}
                    </select>
                    <PublishInputErrMsg errMsg={apartmentConditionErrMsg} setErrMsg={setApartmentConditionErrMsg} inputValue={apartmentCondition} />

                    <label>ישוב<b>*</b></label>
                    <AutoCompleteInput
                        allOptionsListRef={allCitiesListRef}
                        setChosenOption={setChosenCity}
                        chosenOption={chosenCity}
                        isDisabled={false}
                        placeHolder={"איפה נמצא הנכס?"}
                    />
                    <PublishInputErrMsg errMsg={cityErrMsg} setErrMsg={setCityErrMsg} inputValue={chosenCity} />

                    <label>רחוב{allStreetsListState.length > 0 && <b>*</b>}</label>
                    <AutoCompleteInput
                        allOptionsListRef={allStreetsListRef}
                        setChosenOption={setChosenStreet}
                        chosenOption={chosenStreet}
                        isDisabled={allStreetsListState.length === 0}
                        placeHolder={"הכנסת שם הרחוב"}
                    />
                    <span className="street-input-disclaimer">המידע הזה מגיע מגוף ממשלתי, אם הרחוב שלך לא מופיע, מומלץ לבחור רחוב קרוב אליך</span>
                    <br></br>
                    <PublishInputErrMsg errMsg={streetErrMsg} setErrMsg={setStreetErrMsg} inputValue={chosenStreet} />

                    <label>מספר בית<b>*</b></label>
                    <input className="house-num-input" onChange={(e) => { setHouseNum(e.target.value) }} type="number" min="0" />
                    <PublishInputErrMsg errMsg={houseNumErrMsg} setErrMsg={setHouseNumErrMsg} inputValue={houseNum} />

                    <div className="desktop-fields-wrapper">
                    <div className="building-details-container">
                        <label>קומה<b>*</b></label>
                        <label>סה"כ קומות בבניין<b>*</b></label>
                        <input onChange={(e) => { setFloorNum(e.target.value) }} type="number" />
                        <input onChange={(e) => { setMaxFloors(e.target.value) }} type="number" />
                        <PublishInputErrMsg errMsg={floorNumErrMsg} setErrMsg={setFloorNumErrMsg} inputValue={floorNum} />
                        { floorNumErrMsg.length === 0 && <div></div> }
                        <PublishInputErrMsg errMsg={maxFloorsErrMsg} setErrMsg={setMaxFloorsErrMsg} inputValue={maxFloors} />
                    </div>

                    <div className="checkbox-container">
                        <input type="checkbox" onChange={(e) => { setIsOnPolls(e.target.checked); }}/>
                        <label>על עמודים</label>
                    </div>
                    </div>
                </form>

                <PageFooter
                    isCurrPage={props.isCurrPage}
                    pageNum={props.pageNum}
                    goToPrevPageOnClick={props.goToPrevPageOnClick}
                    validateForm={validateFormOnClick}
                />
            </div>
        }
        </>
    );
}

export default Address;
