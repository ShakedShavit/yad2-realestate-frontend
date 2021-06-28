import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '../../actions/loginActions';
import { logoutInDB } from '../../server/api/user';
import { LoginContext } from '../../context/loginContext';
import userIcon from '../../images/user-icon.png';
import CloseSymbol from './CloseSymbol';
import PublishButton from './PublishButton';

function Navbar({ setIsNavbarOpen, setIsLoginModalOpen }) {
    const { userDataState, dispatchUserData } = useContext(LoginContext);

    const [backdropClassList, setBackdropClassList] = useState('hidden-backdrop backdrop');
    const [navClassList, setNavClassList] = useState('hidden-nav');

    useEffect(() => {
        setBackdropClassList('visible-backdrop backdrop');
        setNavClassList('visible-nav');
    }, []);

    const closeNavbarOnClick = () => {
        setBackdropClassList('hidden-backdrop backdrop');
        setNavClassList('hidden-nav');
        setTimeout(() => {
            setIsNavbarOpen(false);
        }, 500);
    }

    const logoutOnClick = () => {
        logoutInDB(userDataState.token)
        .catch((err) => { console.log(err) });

        dispatchUserData(logoutAction());

        closeNavbarOnClick();
    }

    const goToLoginPageOnClick = () => {
        //history.push('/login');
        setIsLoginModalOpen(true);
        setIsNavbarOpen(false);
        // closeNavbarOnClick();
    }

    return (
        <div className="navbar-container">
            <nav className={navClassList}>
                <CloseSymbol classNames={"navbar-close"} closeFunc={closeNavbarOnClick} />

                {
                    !!userDataState.user ?
                    <div className="nav-top">
                        <div className="loggedin-container">
                            <span className="circle name-tag">{userDataState.user.firstName[0]}</span>
                            <div className="personal-area-container">
                                <span className="full-name">{userDataState.user.firstName + " " + userDataState.user.lastName}</span>
                                <span>לאזור האישי</span>
                            </div>
                        </div>
                        <button onClick={logoutOnClick} className="logout-button">התנתקות</button>
                    </div>
                    :
                    <div className="disconnected-container" onClick={goToLoginPageOnClick}>
                        <div className="circle user-icon">
                            <img src={userIcon} alt="user-icon"></img>
                        </div>
                        <span>התחברות</span>
                    </div>
                }

                <PublishButton />
            </nav>

            <div className={backdropClassList} onClick={closeNavbarOnClick}></div>
        </div>
    );
}

export default Navbar;