import React, { useEffect, useState } from 'react';
import imagePlaceholder from '../../images/image-placeholder-icon.png';
import FileDisplay from './FileDisplay';
import commaNumber from 'comma-number';

function ApartmentWrapper({ details, files }) {
    const [isExpanded, setIsExpended] = useState(false);
    const [displayFile, setDisplayFile] = useState(null);

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
        console.log(details)
        if (files.length === 0) return;
        for (let file of files) {
            if (file.type.includes('video')) continue;
            setDisplayFile(file);
            break;
        }
    }, [files]);

    const expandOnClick = () => {
        setIsExpended(!isExpanded);
    }

    return (
        <div onClick={expandOnClick} className="apartment-wrapper">
            {
                !!displayFile ?
                <FileDisplay
                    file={displayFile}
                    className={"image-small"}
                    filesLen={files.length}
                    isApartmentExpanded={isExpanded}
                />
                :
                <div className="image-small"><img src={imagePlaceholder} alt="file-placeholder"></img></div>
            }

            <div className="details-wrapper-closed">
                <div className="info-rows">
                    <span><b>{commaNumber(details.price)} ₪</b></span>
                    <span>{(details.location.streetName || details.location.town) + " " + details.location.houseNum}</span>
                    <span>{apartmentTypesHebrew[apartmentTypesEn.indexOf(details.type)] + ", " + details.location.town}</span>
                </div>

                <div className="divide-line"></div>

                <div className="info-columns">
                    
                </div>
            </div>
        </div>
    );
}

export default ApartmentWrapper;