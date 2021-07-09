import React, { useEffect, useState } from 'react';
import {
    faSnowflake,
    faHouseDamage,
    faBoxOpen,
    faDoorClosed,
    faChair,
    faWheelchair,
    faDungeon,
    faPaintRoller,
    faFaucet,
    faBars
} from '@fortawesome/free-solid-svg-icons';
import PropertyWrapper from './PropertyWrapper';

function ApartmentExpanded({ details }) {
    const [isFullDescOpen, setIsFullDescOpen] = useState(false);
    const [entranceDate, setEntranceDate] = useState('');

    const apartmentProperties = ['מיזוג', 'סורגים', 'מעלית', 'מטבח כשר', 'גישה לנכים', 'משופצת', 'ממ"ד', 'מחסן', 'דלתות פנדור', 'מזגן תדיראן', 'ריהוט'];
    
    const propertiesValues = [
        details.properties.hasAirConditioning,
        details.properties.hasWindowBars,
        details.properties.hasLift,
        details.properties.hasKosherKitchen,
        details.properties.isAccessible,
        details.properties.isRenovated,
        details.properties.hasSafeRoom,
        details.properties.hasShed,
        details.properties.hasPandorDoors,
        details.properties.hasTadiranAc,
        details.properties.hasFurniture
    ];
    const propertiesIcons = [
        faSnowflake,
        faBars,
        faDungeon,
        faFaucet,
        faWheelchair,
        faPaintRoller,
        faHouseDamage,
        faBoxOpen,
        faDoorClosed,
        faSnowflake,
        faChair
    ];

    const apartmentConditionsHebrew = [
        "חדש מקבלן",
        "חדש",
        "משופץ",
        "במצב שמור",
        "דרוש שיפוץ"
    ];
    const apartmentConditionEn = [
        'brand-new',
        'new',
        'renovated',
        'good',
        'in-need-of-renovation'
    ];

    useEffect(() => {
        if (details.entranceDate.isImmediate) return setEntranceDate('כניסה מיידית');
        const date = new Date(details.entranceDate.date);
        setEntranceDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
    }, [details.entranceDate]);

    return (
        <div className="apartment-expanded-container">
            <div className="desc-container">
                <h4>תיאור הנכס</h4>

                <p className={(isFullDescOpen || details.properties.description.length === 0) ? "opened" : "closed"}>
                    {details.properties.description}
                </p>

                { details.properties.description.length > 0 &&
                    <span
                        onClick={() => { setIsFullDescOpen(!isFullDescOpen); }}
                        className="link-span">{isFullDescOpen ? "פחות" : "קרא עוד"}
                    </span>
                }

                <div className={(isFullDescOpen || details.properties.description.length === 0) ? "" : "gradient-cover"}></div>
            </div>
            
            <div className="info-items">
                <div>
                    <span>מצב הנכס</span>
                    <span>{apartmentConditionsHebrew[apartmentConditionEn.indexOf(details.condition)]}</span>
                </div>
                <div>
                    <span>תאריך כניסה</span>
                    <span>{entranceDate}</span>
                </div>
                <div>
                    <span>קומות בבנין</span>
                    <span>{details.location.buildingMaxFloor}</span>
                </div>
                <div>
                    <span>מרפסות</span>
                    <span>{details.properties.numberOfBalconies === 0 ? "ללא" : details.properties.numberOfBalconies}</span>
                </div>
                <div>
                    <span>חניות</span>
                    <span>{details.properties.numberOfParkingSpots === 0 ? "ללא" : details.properties.numberOfParkingSpots}</span>
                </div>
            </div>

            <h4>מה יש בנכס</h4>
            <div className="properties-container">
            {
                apartmentProperties.map((propertyStr, index) => {
                    return (
                        <PropertyWrapper
                            icon={propertiesIcons[index]}
                            isIncluded={propertiesValues[index]}
                            propertyStr={propertyStr}
                            key={index}
                        />
                    );
                })
            }
            </div>
        </div>
    );
}

export default ApartmentExpanded;