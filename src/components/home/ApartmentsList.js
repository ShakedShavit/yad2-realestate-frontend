import React, { useEffect, useState } from 'react';
import { newApartmentsAction } from '../../actions/apartmentsActions';
import { fetchApartmentsFromDB } from '../../server/api/apartment';
import Loader from '../main/Loader';
import ApartmentWrapper from './apartment_display/ApartmentWrapper';

function ApartmentsList({ isLoadingNewApartment, apartmentsState, dispatchApartmentsData }) {
    return (
        <div className="apartments-list">
            { apartmentsState.apartments.map(({ apartment, files }, index) => {
                return (
                    <ApartmentWrapper
                        key={index}
                        details={apartment}
                        files={files}
                    />
                )
            })}

            <div className="footer-loader-container">
            { isLoadingNewApartment &&
                <Loader />                
            }
            </div>
        </div>
    );
}

export default ApartmentsList;