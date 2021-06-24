import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import yad2LogoWhite from '../../images/yad2-logo-white.svg';
import Navbar from './Navbar';

function Header({ setIsLoginModalOpen }) {
    const [scrollY, setScrollY] = useState(0);
    const [headerClassList, setHeaderClassList] = useState('header header-visible');
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const history = useHistory();
    console.log(history.location);

    const onWindowScroll = () => {
        let newPosY = window.pageYOffset;
        let isHidden = headerClassList.includes('hidden');

        if (newPosY > scrollY && !isHidden) {
            setHeaderClassList('header header-hidden');
            console.log('hidden');
        } else if (newPosY < scrollY && isHidden) {
            setHeaderClassList('header header-visible');
            console.log('visible');
        }
        setScrollY(newPosY);
    }

    useEffect(() => {
        window.addEventListener('scroll', onWindowScroll);
        return () => { window.removeEventListener('scroll', onWindowScroll); };
    });

    return (
        <>
            <div className={headerClassList}>
                <div className="navbar-toggle-container" onClick={() => { setIsNavbarOpen(true) }}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className="logo-wrapper"><img src={yad2LogoWhite} alt="yad2-logo" onClick={() => { history.push('/') }} /></div>
                
                {
                    (history.length > 1 && !isNavbarOpen) ?
                    <button className="header__go-back-button" onClick={() => { history.goBack() }}>&#x276F;</button> :
                    <button className="header__go-back-button"></button>
                }                
            </div>

            <div className="header-bottom-spacer"></div>
            
            { isNavbarOpen &&
                <Navbar
                    setIsNavbarOpen={setIsNavbarOpen}
                    setIsLoginModalOpen={setIsLoginModalOpen}
                /> }
        </>
    );
}

export default Header;