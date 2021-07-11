import commaNumber from 'comma-number';
import React from 'react';
import CloseSymbol from '../../main/CloseSymbol';
import Header from '../../main/Header';
import ApartmentExpanded from './ApartmentExpanded';
import FilesModal from './FilesModal';
import MainFile from './MainFile';

function MobileExpandedApartment({ details,
    files,
    displayFile,
    isDisplayFilesModalOpen,
    setIsDisplayFilesModalOpen,
    setIsExpended }) {
    return (
        <div className="apartment-wrapper mobile-apartment-container">
            <Header />
            <CloseSymbol closeFunc={() => { setIsExpended(false); }}/>
            <span className="apartment-location-headline">{`דירה למכירה ב${details.location.town}`}</span>

            { !!displayFile ?
                <MainFile
                    file={displayFile}
                    className={"image-small"}
                    filesLen={files.length}
                    isApartmentExpanded={true}
                    isExpanded={true}
                    setIsDisplayFilesModalOpen={setIsDisplayFilesModalOpen}
                />
                :
                <div className="image-small"></div>
            }

            <div className="apartment-details-container">
                <h1>{commaNumber(details.price)} ₪</h1>
                <span className="apartment-headline">{`${details.location.streetName} ${details.location.houseNum}`}</span>
                <span className="apartment-headline">{`${details.location.town}`}</span>

                <div className="info-columns">
                    <div>
                        <span><b>{details.properties.numberOfRooms}</b></span>
                        <span>חדרים</span>
                    </div>
                    <div>
                        <span><b>{details.location.floor}</b></span>
                        <span>קומה</span>
                    </div>
                    <div>
                        <span><b>{details.size.totalSqm}</b></span>
                        <span>מ"ר</span>
                    </div>
                </div>

                <ApartmentExpanded details={details} />

                { details.properties.furnitureDescription.length > 0 &&
                    <div className="furniture-desc">
                        <h3>פירוט הריהוט בנכס</h3>
                        <span>{details.properties.furnitureDescription}</span>
                    </div>
                }
            </div>
            
            { isDisplayFilesModalOpen && files.length > 0 &&
                <FilesModal
                    files={files}
                    setIsDisplayFilesModalOpen={setIsDisplayFilesModalOpen}
                />
            }
        </div>
    );
}

export default MobileExpandedApartment;