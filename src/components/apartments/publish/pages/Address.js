import React, { useContext, useEffect, useRef, useState } from 'react';
import PageFooter from './PageFooter';
import videoIcon from '../../../../images/video-icon.png';
import { PublishApartmentContext } from '../../../../context/apartmentPublishContext';
import axios from 'axios';

function Address(props) {
    const { apartmentPublishState, dispatchApartmentPublishData } = useContext(PublishApartmentContext);

    const [citiesInputList, setCitiesInputList] = useState([]);

    const citiesList = useRef([]);
    const cityInput = useRef(null);

    useEffect(() => {
        props.setTitle('כתובת הנכס');

        // axios.get('citiesSearchGraph.json', {
        //     headers : { 
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //         }
        //     })
        //     .then((response) => {
        //         citiesSearchGraph.current = response.data;
        //     });

        axios.get('citiesArray.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            })
            .then((response) => {
                citiesList.current = response.data;
            });
    });

    const cityInputOnChange = async (e) => {
        const cityInput = e.target.value;
        const inputLength = cityInput.length;
        if (inputLength < 2) return setCitiesInputList([]);;
        
        let possibleCities = [];
        citiesList.current.forEach((city) => {
            if (city.substring(0, inputLength) === cityInput) possibleCities.push(city);
        });
        setCitiesInputList(possibleCities);
    }

    const chooseCityOnClick = (value) => {
        cityInput.current.value = value;
    }

    const validateFormOnClick = () => {
        // Check if city is in list
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

                <form className="form-body">
                    <label>סוג הנכס<b>*</b></label>
                    <select selected={apartmentPublishState.apartment.type || "דירה"}>
                        <option value="דירה">דירה</option>
                        <option value="דירת גן">דירת גן</option>
                        <option value="בית פרטי\קוטג'">בית פרטי\קוטג'</option>
                        <option value="גג\פנטהאוז">גג\פנטהאוז</option>
                        <option value="מגרשים">מגרשים</option>
                        <option value="דופלקס">דופלקס</option>
                        <option value="דירת נופש">דירת נופש</option>
                        <option value="דו משפחתי">דו משפחתי</option>
                        <option value="מרתף\פרטר">מרתף\פרטר</option>
                        <option value="טריפלקס">טריפלקס</option>
                        <option value="יחידת דיור">יחידת דיור</option>
                        <option value="משק חקלאי\נחלה">משק חקלאי\נחלה</option>
                        <option value="משק עזר">משק עזר</option>
                        <option value="דיור מוגן">דיור מוגן</option>
                        <option value="בניין מגורים">בניין מגורים</option>
                        <option value="סטודיו\לופט">סטודיו\לופט</option>
                        <option value="מחסן">מחסן</option>
                        <option value="קב' רכישה\זכות לנכס">קב' רכישה\זכות לנכס</option>
                        <option value="חניה">חניה</option>
                        <option value="כללי">כללי</option>
                    </select>

                    <label>מצב הנכס<b>*</b></label>
                    <select selected={apartmentPublishState.apartment.type || "דירה"}>
                        <option value="דירה">חדש מקבלן (לא גרו בו בכלל)</option>
                        <option value="חדש (נכס בן עד 5 שנים)">חדש (נכס בן עד 5 שנים)</option>
                        <option value="משופץ (שופץ ב5 השנים האחרונות)">משופץ (שופץ ב5 השנים האחרונות)</option>
                        <option value="במצב שמור (במצב טוב, לא שופץ)">במצב שמור (במצב טוב, לא שופץ)</option>
                        <option value="דרוש שיפוץ (דקוק לעבודת שיפוץ)">דרוש שיפוץ (זקוק לעבודת שיפוץ)</option>
                    </select>

                    <label>ישוב<b>*</b></label>
                    <input ref={cityInput} type="text" onChange={cityInputOnChange} />
                    <div class="options">
                        { citiesInputList.map((city, index) => {
                            return <div key={index} onClick={() => { chooseCityOnClick(citiesInputList[index]); }} className="location-input-option">{city}</div>
                        })}
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