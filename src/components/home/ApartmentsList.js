import React, { useEffect, useReducer } from 'react';
import { newApartmentsAction } from '../../actions/apartmentsActions';
import apartmentsReducer, { initialApartmentsState } from '../../reducers/apartmentsReducer';
import { fetchApartmentsFromDB } from '../../server/api/apartment';
import ApartmentWrapper from './ApartmentWrapper';

function ApartmentsList(props) {
    const [apartmentsState, dispatchApartmentsData] = useReducer(apartmentsReducer, initialApartmentsState);

    // When search query params change, fetch new apartments and remove the old ones
    useEffect(() => {
        // fetch apartments
        fetchApartmentsFromDB(props.searchParamsState)
        .then((newApartments) => {
            console.log(props.searchParamsState, newApartments);
            dispatchApartmentsData(newApartmentsAction(newApartments));
        })
        .catch((err) => {
            console.log(err);
        });
    }, [props.searchParamsState]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatchSearchParamsData(newSearchParamsAction({ "town": "Tel-Aviv" }))
    //     }, 1000);
    // }, []);

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
        </div>
    );
}

export default ApartmentsList;