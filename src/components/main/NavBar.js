import React, { useEffect, useState } from 'react';

function Navbar({ isNavbarOpen, setIsNavbarOpen }) {
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

    return (
        <div className="navbar-container">
            <nav className={navClassList}></nav>
            <div className={backdropClassList} onClick={closeNavbarOnClick}></div>
        </div>
    );
}

export default Navbar;