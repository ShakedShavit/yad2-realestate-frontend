import React from 'react';
import couchSymbol from '../../images/couch-symbol.svg';

function WelcomeBanner({ isSignup }) {
    return (
        <div className="welcome-banner">
            <div className="welcome-text-container">
                <h1>ברוכים הבאים לאתר יד2</h1>
                <h4>{isSignup ? "הצטרפו לקהילה שלנו!" : "טוב לראות אותך שוב!"}</h4>
            </div>
            <img src={couchSymbol} alt="couch-symbol"></img>
        </div>
    );
}

export default WelcomeBanner;