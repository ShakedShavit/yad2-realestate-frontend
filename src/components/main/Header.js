import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import yad2Logo from '../../images/yad2-logo.png';
import yad2LogoOrange from '../../images/Yad2_logo_white2.svg';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../context/loginContext';
import { isMobile } from 'react-device-detect';

function Header({ setIsLoginModalOpen, setIsGoToPublish = () => {} }) {
    const { userDataState } = useContext(LoginContext);

    // const [scrollY, setScrollY] = useState(0);
    const [headerClassList, setHeaderClassList] = useState('header header-visible');
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);


    const history = useHistory();

    useEffect(() => {
        if (isMobile && !headerClassList.includes("mobile-header")) setHeaderClassList(headerClassList + " mobile-header");
        if (!isMobile && headerClassList.includes("mobile-header")) setHeaderClassList(headerClassList);
    }, [isMobile, headerClassList]);

    // const onWindowScroll = () => {
    //     let newPosY = window.pageYOffset;
    //     let isHidden = headerClassList.includes('hidden');

    //     if (newPosY > scrollY && !isHidden) {
    //         setHeaderClassList('header header-hidden');
    //     } else if (newPosY < scrollY && isHidden) {
    //         setHeaderClassList('header header-visible');
    //     }
    //     setScrollY(newPosY);
    // }

    // useEffect(() => {
    //     window.addEventListener('scroll', onWindowScroll);
    //     return () => { window.removeEventListener('scroll', onWindowScroll); };
    // });

    const publishNewApartmentOnClick = () => {
        if (!userDataState.user) {
            setIsLoginModalOpen(true);
            setIsGoToPublish(true);
            return;
        }
        history.push('/publish');
    }

    return (
        <>
            <div className={headerClassList}>
                <div className="navbar-toggle-container" onClick={() => { setIsNavbarOpen(true) }}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className="logo-wrapper"><img src={isMobile ? yad2LogoOrange : yad2Logo} alt="yad2-logo" onClick={() => { history.push('/') }} /></div>
                
                {
                    (!isNavbarOpen) ?
                    <button className="header__go-back-button" onClick={() => { history.push('/') }}>&#x276F;</button> :
                    <button className="header__go-back-button"></button>
                }                

                { !isMobile &&
                    <div onClick={publishNewApartmentOnClick}>
                        <div className="publish-ad__link">
                            <FontAwesomeIcon icon={faPlus} />
                            &nbsp;
                            <span>פרסום מודעה חדשה</span>
                        </div>
                    </div>
                }
            </div>

            {/* <div className="header-bottom-spacer"></div> */}
            
            { isNavbarOpen &&
                <Navbar
                    setIsNavbarOpen={setIsNavbarOpen}
                    setIsLoginModalOpen={setIsLoginModalOpen}
                    publishNewApartmentOnClick={publishNewApartmentOnClick}
                />
            }
        </>
    );
}

export default Header;