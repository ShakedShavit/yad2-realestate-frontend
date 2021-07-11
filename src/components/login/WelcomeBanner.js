import React from 'react';
import couchSymbol from '../../images/couch-symbol.svg';
import logo from '../../images/yad2-logo-white.svg';

function WelcomeBanner({ isSignup }) {
    return (
        <div className="welcome-banner">
            <div className="welcome-text-container">
                <img className="logo-img" src={logo} alt="site-logo"></img>
                <h1>ברוכים הבאים לאתר יד2</h1>
                <h4>{isSignup ? "הצטרפו לקהילה שלנו!" : "טוב לראות אותך שוב!"}</h4>
            </div>
            <img src={couchSymbol} alt="couch-symbol"></img>
        </div>
    );
}

export default WelcomeBanner;