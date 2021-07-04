import React, { useEffect, useReducer, useState } from 'react';
import { addApartmentsAction, newApartmentsAction } from '../../actions/apartmentsActions';
import { newSearchParamsAction } from '../../actions/searchParamsActions';
import { fetchApartmentsFromDB } from '../../server/api/apartment';
import { getSearchParamsFromCookie, saveSearchParamsOnCookie } from '../../cookies/searchParamsCookies';
import apartmentsReducer, { initialApartmentsState } from '../../reducers/apartmentsReducer';
import searchParamsReducer, { initialSearchParamsState } from '../../reducers/searchParamsReducer';
import LoginPage from '../login/LoginPage';
import SignupSecondPage from '../login/SignupSecondPage';
import WelcomeBanner from '../login/WelcomeBanner';
import Header from '../main/Header';
import Modal from '../main/Modal';
import Notification from '../main/Notification';
import ApartmentsList from './ApartmentsList';

function HomePage() {
    const cookiesSearchQueryParamsData = getSearchParamsFromCookie();
    const [searchParamsState, dispatchSearchParamsData] = useReducer(searchParamsReducer, cookiesSearchQueryParamsData || initialSearchParamsState);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoginNotification, setIsLoginNotification] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [isSignupSecondPage, setIsSignupSecondPage] = useState(false);
    const [emailVal, setEmailVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
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

    useEffect(() => {
        saveSearchParamsOnCookie(searchParamsState);
    }, [searchParamsState]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatchSearchParamsData(newSearchParamsAction({ "town": "Tel-Aviv" }))
    //     }, 1000);
    // }, []);

    useEffect(() => {
        if (!isLoginModalOpen && isSignupSecondPage) setIsSignupSecondPage(false);
    }, [isLoginModalOpen, isSignupSecondPage]);

    return (
        <>
        <div className={isLoginModalOpen ? "home-page no-scroll" : "home-page"}>
            <Header setIsLoginModalOpen={setIsLoginModalOpen} />
            
            { isLoginModalOpen &&
                <Modal setIsModalOpen={setIsLoginModalOpen}>
                    <div className="login-page">
                        <WelcomeBanner isSignup={isSignup} />

                        <div className="header-login">
                            <h3>{ isSignup ? "הרשמה" : "התחברות" }</h3>
                            <p>{ isSignup ? "הזן את הפרטים כדי להירשם" : "הזן את הפרטים כדי להתחבר" }</p>
                        </div>

                        {
                        !isSignupSecondPage ?
                        <LoginPage
                            isSignup={isSignup}
                            setIsSignup={setIsSignup}
                            setIsLoginModalOpen={setIsLoginModalOpen}
                            setIsSignupSecondPage={setIsSignupSecondPage}
                            emailVal={emailVal}
                            setEmailVal={setEmailVal}
                            passwordVal={passwordVal}
                            setPasswordVal={setPasswordVal}
                            setIsLoginNotification={setIsLoginNotification}
                        />
                        :
                        <SignupSecondPage
                            setIsLoginModalOpen={setIsLoginModalOpen}
                            setIsSignupSecondPage={setIsSignupSecondPage}
                            emailVal={emailVal}
                            setEmailVal={setEmailVal}
                            passwordVal={passwordVal}
                            setPasswordVal={setPasswordVal}
                            setIsLoginNotification={setIsLoginNotification}
                        />
                        }
                    </div>
                </Modal>
            }

            <h1>Home</h1>

            <ApartmentsList
                searchParamsState={searchParamsState}
            />
        </div>

        { isLoginNotification && <Notification text="התחברת בהצלחה" isSuccess={true} setIsNotificationOpen={setIsLoginNotification}  /> }
        </>
    );
}

export default HomePage;