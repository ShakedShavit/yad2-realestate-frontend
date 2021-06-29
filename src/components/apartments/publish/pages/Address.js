import React, { useContext, useEffect, useRef, useState } from 'react';
import PageFooter from './PageFooter';
import videoIcon from '../../../../images/video-icon.png';
import { PublishApartmentContext } from '../../../../context/apartmentPublishContext';
import axios from 'axios';
import AutoCompleteInput from '../AutoCompleteInput';
import SelectOption from '../SelectOption';

function Address(props) {
    const { apartmentPublishState, dispatchApartmentPublishData } = useContext(PublishApartmentContext);

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

    useEffect(() => {
        props.setTitle('כתובת הנכס');

        axios.get('citiesArray.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
            .then((response) => {
                allCitiesListRef.current = response.data;
            });
    });

    useEffect(() => {
        if (!chosenCity) return setAllStreetsListState([]);

        axios.get('streetsGraph.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
            .then((response) => {
                const newOptions = response.data[chosenCity] || [];
                allStreetsListRef.current = newOptions;
                setAllStreetsListState(newOptions);
            })
            .catch((err) => { setAllStreetsListState([]); });
    }, [chosenCity]);

    useEffect(() => {
        setCityErrMsg('');
    }, [chosenCity]);
    useEffect(() => {
        setStreetErrMsg('');
    }, [chosenStreet]);
    useEffect(() => {
        console.log(apartmentType);
        setApartmentTypeErrMsg('');
    }, [apartmentType]);
    useEffect(() => {
        setApartmentConditionErrMsg('');
    }, [apartmentCondition]);
    useEffect(() => {
        setHouseNumErrMsg('');
    }, [houseNum]);
    useEffect(() => {
        setFloorNumErrMsg('');
    }, [floorNum]);
    useEffect(() => {
        setMaxFloorsErrMsg('');
    }, [maxFloors]);

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

        if (!isFormValid) return { isFormValid, newProperties: {} };
    }

    return (
        <>
        { props.isCurrPage &&
            <div className="publish-page-content publish-address-page">
                <div className="advice-wrapper">
                    <div className="video-icon-container"><img src={videoIcon} alt="video-icon"></img></div>
                    <div>
                        <h4>המלצה שלנו</h4>
                        <span>העלאת וידאו של הנכס תמשוך יותר מתעניינים למודעה שלך</span>
                    </div>
                </div>

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
                    { apartmentTypeErrMsg.length !== 0 && <span className="input-err-msg">{apartmentTypeErrMsg}</span> }

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
                    { apartmentConditionErrMsg.length !== 0 && <span className="input-err-msg">{apartmentConditionErrMsg}</span> }

                    <label>ישוב<b>*</b></label>
                    <AutoCompleteInput
                        allOptionsListRef={allCitiesListRef}
                        setChosenOption={setChosenCity}
                        chosenOption={chosenCity}
                        isDisabled={false}
                        placeHolder={"איפה נמצא הנכס?"}
                    />
                    { cityErrMsg.length !== 0 && <span className="input-err-msg">{cityErrMsg}</span> }

                    <label>רחוב{allStreetsListState.length > 0 && <b>*</b>}</label>
                    <AutoCompleteInput
                        allOptionsListRef={allStreetsListRef}
                        setChosenOption={setChosenStreet}
                        chosenOption={chosenStreet}
                        isDisabled={allStreetsListState.length === 0}
                        placeHolder={"הכנסת שם הרחוב"}
                    />
                    <span className="street-input-disclaimer">המידע הזה מגיע מגוף ממשלתי, אם הרחוב שלך לא מופיע, מומלץ לבחור רחוב קרוב אליך</span>
                    { streetErrMsg.length !== 0 && <span className="input-err-msg"><br></br>{streetErrMsg}</span> }

                    <label>מספר בית<b>*</b></label>
                    <input onChange={(e) => { setHouseNum(e.target.value) }} type="number" min="0" />
                    { houseNumErrMsg.length !== 0 && <span className="input-err-msg">{houseNumErrMsg}</span> }

                    <div className="building-details-container">
                        <label>קומה<b>*</b></label>
                        <label>סה"כ קומות בבניין<b>*</b></label>
                        <input onChange={(e) => { setFloorNum(e.target.value) }} type="number" />
                        <input onChange={(e) => { setMaxFloors(e.target.value) }} type="number" />
                        { floorNumErrMsg.length !== 0 ? <span className="input-err-msg">{floorNumErrMsg}</span> : <div></div> }
                        { maxFloorsErrMsg.length !== 0 && <span className="input-err-msg">{maxFloorsErrMsg}</span> }
                    </div>

                    <div class="checkbox-container">
                        <input type="checkbox" onChange={(e) => { setIsOnPolls(e.target.checked); }}/>
                        <label>על עמודים</label>
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
