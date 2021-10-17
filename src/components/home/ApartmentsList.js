import React from "react";
import Loader from "../main/Loader";
import ApartmentWrapper from "./apartment_display/ApartmentWrapper";

function ApartmentsList({
    isLoadingNewApartment,
    apartmentsState,
    dispatchApartmentsData,
}) {
    return (
        <div className="apartments-list">
            {apartmentsState.apartments.map(({ apartment, files }) => {
                return (
                    <ApartmentWrapper
                        key={apartment._id}
                        details={apartment}
                        files={files}
                    />
                );
            })}

            <div className="footer-loader-container">
                {isLoadingNewApartment && <Loader />}
            </div>
        </div>
    );
}

export default ApartmentsList;
