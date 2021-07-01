import React, { useEffect, useState } from 'react';
import PublishInputErrMsg from '../PublishInputErrMsg';
import SelectOption from '../SelectOption';
import Switcher from '../Switcher';
import PropertyWrapper from '../PropertyWrapper.js';
import PageFooter from './PageFooter';
import {
    faSnowflake,
    faHouseDamage,
    faBoxOpen,
    faDoorClosed,
    faChair,
    faWheelchair,
    faDungeon,
    faHome,
    faPaintRoller,
    faFaucet,
    faSolarPanel,
    faBars
} from '@fortawesome/free-solid-svg-icons';

function Properties(props) {
    const roomsNumOptions = [ 'בחירת מספר חדרים', 0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8, 9, 10, 11, 12 ];
    const parkingOptions = ['ללא', 1, 2, 3];
    const balconiesOptions = ['ללא', 1, 2, 3];
    const apartmentProperties = ['מיזוג', 'ממ"ד', 'מחסן', 'דלתות פנדור', 'ריהוט', 'גישה לנכים', 'מעלית', 'מזגן תדיראן', 'יחידת דיור', 'משופצת', 'מטבח כשר', 'דוד שמש', 'סורגים'];
    const propertiesIcons = [faSnowflake, faHouseDamage, faBoxOpen, faDoorClosed, faChair, faWheelchair, faDungeon, faSnowflake, faHome, faPaintRoller, faFaucet, faSolarPanel, faBars];

    const [roomsNum, setRoomsNum] = useState('');
    const [numOfParkingSpots, setNumOfParkingSpots] = useState('ללא');
    const [numOfBalconies, setNumOfBalconies] = useState('ללא');
    const [chosenProperties, setChosenProperties] = useState([]);
    const [furnitureDesc, setFurnitureDesc] = useState('');
    const [apartmentDesc, setApartmentDesc] = useState('');

    const [roomsNumErrMsg, setRoomsNumErrMsg] = useState('');

    useEffect(() => {
        props.setTitle('על הנכס');
    }, []);

    const validateFormOnClick = () => {
        let isFormValid = true;

        if (roomsNum === '') {
            isFormValid = false;
            setRoomsNumErrMsg('שדה חובה מספר חדרים');
        }

        return { isFormValid, newProperties: isFormValid ? {
            'numberOfRooms': roomsNum,
            'numberOfParkingSpots': numOfParkingSpots === "ללא" ? 0 : Number(numOfParkingSpots),
            'numberOfBalconies': numOfBalconies === "ללא" ? 0 : Number(numOfBalconies),

            'hasAirConditioning': chosenProperties.includes(apartmentProperties[0]),
            'hasSafeRoom': chosenProperties.includes(apartmentProperties[1]),
            'hasShed': chosenProperties.includes(apartmentProperties[2]),
            'hasPandorDoors': chosenProperties.includes(apartmentProperties[3]),
            'hasFurniture': chosenProperties.includes(apartmentProperties[4]),
            'isAccessible': chosenProperties.includes(apartmentProperties[5]),
            'hasLift': chosenProperties.includes(apartmentProperties[6]),
            'hasTadiranAc': chosenProperties.includes(apartmentProperties[7]),
            'isRenovated': chosenProperties.includes(apartmentProperties[9]),
            'hasKosherKitchen': chosenProperties.includes(apartmentProperties[10]),
            'hasSunHeatedWaterTanks': chosenProperties.includes(apartmentProperties[11]),
            'hasWindowBars': chosenProperties.includes(apartmentProperties[12]),
            
            'description': furnitureDesc,
            'furnitureDescription': apartmentDesc,
        } : {} }
    }

    return (
        <>
        { props.isCurrPage &&
        <div className="publish-page-content">
            <form className="form-body properties-form">
                <label>מספר חדרים<b>*</b></label>
                <select onChange={(e) => { setRoomsNum(e.target.value) }}>
                { roomsNumOptions.map((roomsNum, index) => {
                    return (<SelectOption key={index} value={roomsNum} isDefaultValue={index === 0} />)
                }) }
                </select>
                <PublishInputErrMsg errMsg={roomsNumErrMsg} setErrMsg={setRoomsNumErrMsg} inputValue={roomsNum} />

                <label>חניה</label>
                <Switcher options={parkingOptions} chosenOption={numOfParkingSpots} setChosenOption={setNumOfParkingSpots} />

                <label>מרפסת</label>
                <Switcher options={balconiesOptions} chosenOption={numOfBalconies} setChosenOption={setNumOfBalconies} />

                <h2>מאפייני הנכס</h2>
                <div className="publish-properties-container">
                    { apartmentProperties.map((property, index) => {
                        return (<PropertyWrapper
                            key={index}
                            value={property}
                            chosenProperties={chosenProperties}
                            setChosenProperties={setChosenProperties}
                            icon={propertiesIcons[index]}
                        />)
                    })}
                </div>

                <h2>מה חשוב לך שידעו על הנכס?</h2>
                <div>
                    <label>פרוט הריהוט</label>
                    <textarea onChange={(e) => {setFurnitureDesc(e.target.value)}} maxLength="200"></textarea>

                    <label>פרוט הנכס</label>
                    <textarea onChange={(e) => {setApartmentDesc(e.target.value)}} maxLength="400" placeholder="זה המקום לתאר את הפרטים הבולטים, למשל, האם נערך שיפוץ במבנה, מה שופץ, כיווני אוויר, האווירה ברחוב וכו'"></textarea>
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

export default Properties;