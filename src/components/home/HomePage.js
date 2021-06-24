import React, { useEffect, useReducer, useState } from 'react';
import { addApartmentsAction, newApartmentsAction } from '../../actions/apartmentsActions';
import { newSearchParamsAction } from '../../actions/searchParamsActions';
import { fetchApartmentsFromDB } from '../../api/db/apartment';
import { getSearchParamsFromCookie, saveSearchParamsOnCookie } from '../../cookies/searchParamsCookies';
import apartmentsReducer, { initialApartmentsState } from '../../reducers/apartmentsReducer';
import searchParamsReducer, { initialSearchParamsState } from '../../reducers/searchParamsReducer';
import LoginPage from '../login/LoginPage';
import Header from '../main/Header';
import Modal from '../main/Modal';

function HomePage() {
    const cookiesSearchQueryParamsData = getSearchParamsFromCookie(); // !! Check if this works
    const [searchParamsState, dispatchSearchParamsData] = useReducer(searchParamsReducer, cookiesSearchQueryParamsData || initialSearchParamsState);
    const [apartmentsState, dispatchApartmentsData] = useReducer(apartmentsReducer, initialApartmentsState);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // useEffect(() => {
    //     // fetch apartments
    //     fetchApartmentsFromDB(searchParamsState, apartmentsState.apartmentIds)
    //     .then((newApartments) => {
    //         dispatchApartmentsData(addApartmentsAction(newApartments));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // }, []);

    // When search query params change, fetch new apartments and remove the old ones
    useEffect(() => {
        // fetch apartments
        fetchApartmentsFromDB(searchParamsState)
        .then((newApartments) => {
            console.log(searchParamsState, newApartments);
            dispatchApartmentsData(newApartmentsAction(newApartments));
            saveSearchParamsOnCookie(searchParamsState);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [searchParamsState]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatchSearchParamsData(newSearchParamsAction({ "town": "Tel-Aviv" }))
    //     }, 1000);
    // }, []);

    return (
        <div className="home-page">
            <Header setIsLoginModalOpen={setIsLoginModalOpen} />
            { isLoginModalOpen &&
                <Modal setIsModalOpen={setIsLoginModalOpen}>
                    <LoginPage />
                </Modal>
            }
            <h1>Home</h1>
        </div>
    );
}

export default HomePage;