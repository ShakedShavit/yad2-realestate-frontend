import React, { useEffect, useState } from 'react';
import imagePlaceholder from '../../../images/image-placeholder-icon.png';
import MainFile from './MainFile';
import commaNumber from 'comma-number';
import ApartmentExpanded from './ApartmentExpanded';
import FilesModal from './FilesModal';

function ApartmentWrapper({ details, files }) {
    const [isExpanded, setIsExpended] = useState(false);
    const [displayFile, setDisplayFile] = useState(null);
    const [isDisplayFilesModalOpen, setIsDisplayFilesModalOpen] = useState(false);

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
        <>
        <div onClick={expandOnClick} className="apartment-wrapper">
            {
                !!displayFile ?
                <MainFile
                    file={displayFile}
                    className={"image-small"}
                    filesLen={files.length}
                    isApartmentExpanded={isExpanded}
                    isExpanded={isExpanded}
                    setIsDisplayFilesModalOpen={setIsDisplayFilesModalOpen}
                />
                :
                <div className="image-small"></div>
            }

            <div className="details-wrapper-closed">
                <div className="info-rows">
                    <span><b>{commaNumber(details.price)} ₪</b></span>
                    <span>{(details.location.streetName || details.location.town) + " " + details.location.houseNum}</span>
                    <span>{apartmentTypesHebrew[apartmentTypesEn.indexOf(details.type)] + ", " + details.location.town}</span>
                </div>

                <div className="divide-line"></div>

                <div className="info-columns">
                    <div>
                        <span>{details.properties.numberOfRooms}</span>
                        <span>חדרים</span>
                    </div>
                    <div>
                        <span>{details.location.floor}</span>
                        <span>קומה</span>
                    </div>
                    <div>
                        <span>{details.size.totalSqm}</span>
                        <span>מ"ר</span>
                    </div>
                </div>
            </div>
        </div>

        { isExpanded &&
            <ApartmentExpanded
                details={details}
            />
        }

        { isDisplayFilesModalOpen && files.length > 0 &&
            <FilesModal
                files={files}
                setIsDisplayFilesModalOpen={setIsDisplayFilesModalOpen}
            />
        }
        </>
    );
}

export default ApartmentWrapper;