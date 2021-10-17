import React, { useEffect, useState } from "react";
import MainFile from "./MainFile";
import commaNumber from "comma-number";
import ApartmentExpanded from "./ApartmentExpanded";
import FilesModal from "./FilesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import PhoneNumDropdown from "./PhoneNumDropdown";
import { isMobile } from "react-device-detect";
import MobileExpandedApartment from "./MobileExpandedApartment";

function ApartmentWrapper({ details, files }) {
    const [isExpanded, setIsExpended] = useState(false);
    const [displayFile, setDisplayFile] = useState(null);
    const [isDisplayFilesModalOpen, setIsDisplayFilesModalOpen] =
        useState(false);
    const [isPhoneNumDropdownOpen, setIsPhoneNumDropdownOpen] = useState(false);

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
        "כללי",
    ];
    const apartmentTypesEn = [
        "apartment",
        "garden-apartment",
        "private-house/cottage",
        "rooftop/penthouse",
        "lots",
        "duplex",
        "vacation-apartment",
        "two-family-dwelling",
        "basement/parterre",
        "triplex",
        "residential-unit",
        "farm/estate",
        "auxiliary-farm",
        "protected-accommodation",
        "residential-building",
        "studio/loft",
        "garage",
        "parking",
        "general",
    ];

    useEffect(() => {
        if (files.length === 0) return;
        for (let file of files) {
            if (file?.mimetype?.includes("video")) continue;
            setDisplayFile(file);
            break;
        }
    }, [files]);

    const expandOnClick = () => {
        setIsExpended(!isExpanded);
    };

    return (
        <>
            {isExpanded && isMobile ? (
                <MobileExpandedApartment
                    files={files}
                    details={details}
                    displayFile={displayFile}
                    isDisplayFilesModalOpen={isDisplayFilesModalOpen}
                    setIsDisplayFilesModalOpen={setIsDisplayFilesModalOpen}
                    setIsExpended={setIsExpended}
                />
            ) : (
                <>
                    <div
                        onClick={expandOnClick}
                        className={
                            isExpanded
                                ? "apartment-wrapper apartment-wrapper-expanded"
                                : "apartment-wrapper"
                        }
                    >
                        {!!displayFile ? (
                            <MainFile
                                file={displayFile}
                                className={"image-small"}
                                filesLen={files.length}
                                isApartmentExpanded={isExpanded}
                                isExpanded={isExpanded}
                                setIsDisplayFilesModalOpen={
                                    setIsDisplayFilesModalOpen
                                }
                            />
                        ) : (
                            <div className="image-small"></div>
                        )}

                        <div className="details-wrapper-closed">
                            <div className="info-rows">
                                <span className="mobile-price">
                                    <b>{commaNumber(details.price)} ₪</b>
                                </span>
                                <span className="desktop-local-headline">
                                    {(details.location.streetName ||
                                        details.location.town) +
                                        " " +
                                        details.location.houseNum}
                                </span>
                                <span>
                                    {apartmentTypesHebrew[
                                        apartmentTypesEn.indexOf(details.type)
                                    ] +
                                        ", " +
                                        details.location.town}
                                </span>
                            </div>

                            <div className="divide-line"></div>

                            <div className="info-columns">
                                <div>
                                    <span>
                                        {details.properties.numberOfRooms}
                                    </span>
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

                            <div className="desktop-divide-line divide-line"></div>

                            <div className="phone-num-btn-and-price">
                                <div className="desktop-price">
                                    <span>{commaNumber(details.price)} ₪</span>
                                    <span className="link-span details-span desktop-details-span">
                                        לחצו לפרטים
                                    </span>
                                </div>

                                {isExpanded && (
                                    <div className="phone-num-btn">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsPhoneNumDropdownOpen(
                                                    !isPhoneNumDropdownOpen
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                className="icon"
                                                icon={faPhone}
                                            />
                                            <span>הצגת מספר טלפון</span>
                                        </button>
                                        {isPhoneNumDropdownOpen && (
                                            <PhoneNumDropdown
                                                publishers={details.publishers}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {isExpanded && <ApartmentExpanded details={details} />}

                    {isDisplayFilesModalOpen && files.length > 0 && (
                        <FilesModal
                            files={files}
                            setIsDisplayFilesModalOpen={
                                setIsDisplayFilesModalOpen
                            }
                        />
                    )}
                </>
            )}
        </>
    );
}

export default ApartmentWrapper;
