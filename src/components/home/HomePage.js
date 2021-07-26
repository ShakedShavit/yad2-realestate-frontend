import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  addApartmentsAction,
  newApartmentsAction,
} from "../../actions/apartmentsActions";
import {
  getSearchParamsFromCookie,
  saveSearchParamsOnCookie,
} from "../../cookies/searchParamsCookies";
import apartmentsReducer, {
  initialApartmentsState,
} from "../../reducers/apartmentsReducer";
import searchParamsReducer, {
  initialSearchParamsState,
} from "../../reducers/searchParamsReducer";
import { fetchApartmentsFromDB } from "../../server/api/apartment";
import LoginPage from "../login/LoginPage";
import SignupSecondPage from "../login/SignupSecondPage";
import WelcomeBanner from "../login/WelcomeBanner";
import Header from "../main/Header";
import Modal from "../main/Modal";
import Notification from "../main/Notification";
import AdvancedSearch from "./advanced_search/AdvancedSearch";
import ApartmentsList from "./ApartmentsList";
import SortApartments from "./sorting_search/SortApartments";

function HomePage() {
  const [apartmentsState, dispatchApartmentsData] = useReducer(
    apartmentsReducer,
    initialApartmentsState
  );

  const cookiesSearchQueryParamsData = getSearchParamsFromCookie();
  const [searchParamsState, dispatchSearchParamsData] = useReducer(
    searchParamsReducer,
    cookiesSearchQueryParamsData || initialSearchParamsState
  );

  const [isLoadingNewApartment, setIsLoadingNewApartments] = useState(false);
  const [isSortingDropdownOpen, setIsSortingDropdownOpen] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isGoToPublish, setIsGoToPublish] = useState(false);
  const [isLoginNotification, setIsLoginNotification] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isSignupSecondPage, setIsSignupSecondPage] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");

  const homePageRef = useRef(null);

  useEffect(() => {
    saveSearchParamsOnCookie(searchParamsState);
  }, [searchParamsState]);

  useEffect(() => {
    if (!isLoginModalOpen && isSignupSecondPage) setIsSignupSecondPage(false);
  }, [isLoginModalOpen, isSignupSecondPage]);

  // When search query params change, fetch new apartments and remove the old ones
  useEffect(() => {
    // fetch apartments
    fetchApartmentsFromDB(searchParamsState, [])
      .then((newApartments) => {
        console.log(searchParamsState, newApartments);
        dispatchApartmentsData(newApartmentsAction(newApartments));
        setIsLoadingNewApartments(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingNewApartments(false);
      });
  }, [searchParamsState]);

  const pageOnScroll = () => {
    if (!homePageRef.current || isLoginModalOpen || isLoadingNewApartment)
      return;

    const { scrollTop, scrollHeight, clientHeight } = homePageRef.current;
    if (Math.abs(scrollTop + clientHeight - scrollHeight) > 1) return;

    setIsLoadingNewApartments(true);

    // fetch apartments
    fetchApartmentsFromDB(searchParamsState, apartmentsState.apartmentIds || [])
      .then((newApartments) => {
        console.log(searchParamsState, newApartments);
        dispatchApartmentsData(addApartmentsAction(newApartments));
        setIsLoadingNewApartments(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingNewApartments(false);
      });
  };

  return (
    <>
      <div
        className={isLoginModalOpen ? "home-page no-scroll" : "home-page"}
        ref={homePageRef}
        onScroll={pageOnScroll}
        onClick={() => {
          setIsSortingDropdownOpen(false);
        }}
      >
        <Header
          setIsLoginModalOpen={setIsLoginModalOpen}
          setIsGoToPublish={setIsGoToPublish}
        />

        {isLoginModalOpen && (
          <Modal
            setIsModalOpen={setIsLoginModalOpen}
            setIsGoToPublish={setIsGoToPublish}
          >
            <div className="login-page">
              <WelcomeBanner isSignup={isSignup} />

              <div className="login-main-content">
                <div className="header-login">
                  <h3>{isSignup ? "הרשמה" : "התחברות"}</h3>
                  <p>
                    {isSignup
                      ? "הזן את הפרטים כדי להירשם"
                      : "הזן את הפרטים כדי להתחבר"}
                  </p>
                </div>

                {!isSignupSecondPage ? (
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
                    isGoToPublish={isGoToPublish}
                  />
                ) : (
                  <SignupSecondPage
                    setIsLoginModalOpen={setIsLoginModalOpen}
                    setIsSignupSecondPage={setIsSignupSecondPage}
                    emailVal={emailVal}
                    setEmailVal={setEmailVal}
                    passwordVal={passwordVal}
                    setPasswordVal={setPasswordVal}
                    setIsLoginNotification={setIsLoginNotification}
                    isGoToPublish={isGoToPublish}
                  />
                )}
              </div>
            </div>
          </Modal>
        )}

        <div className="headline first-headline">
          <span>ראשי</span>
          &nbsp;&nbsp;&nbsp;
          <span>/ &nbsp;&nbsp;נדל"ן למכירה</span>
        </div>

        <AdvancedSearch dispatchSearchParamsData={dispatchSearchParamsData} />

        <div className="headline second-headline">
          <span>נדל״ן למכירה </span>
          <span>{`מציג ${apartmentsState.apartments.length} מודעות`}</span>
        </div>

        <SortApartments
          isSortingDropdownOpen={isSortingDropdownOpen}
          setIsSortingDropdownOpen={setIsSortingDropdownOpen}
          apartmentsState={apartmentsState}
          dispatchApartmentsData={dispatchApartmentsData}
        />

        <ApartmentsList
          isLoadingNewApartment={isLoadingNewApartment}
          apartmentsState={apartmentsState}
          dispatchApartmentsData={dispatchApartmentsData}
        />
      </div>

      {isLoginNotification && (
        <Notification
          text="התחברת בהצלחה"
          isSuccess={true}
          setIsNotificationOpen={setIsLoginNotification}
        />
      )}
    </>
  );
}

export default HomePage;
