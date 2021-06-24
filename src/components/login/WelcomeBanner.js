import React from 'react';
import { useHistory } from 'react-router-dom';
import CloseSymbol from '../main/CloseSymbol';
import couchSymbol from '../../images/couch-symbol.svg';

function WelcomeBanner() {
    const history = useHistory();

    const goBackOnClick = () => {
        history.push('/');
    }

    return (
        <div className="welcome-banner">
            <div className="welcome-text-container">
                <h1>ברוכים הבאים לאתר יד2</h1>
                <h4>טוב לראות אותך שוב!</h4>
            </div>
            <img src={couchSymbol} alt="couch-symbol"></img>
        </div>
    );
}

export default WelcomeBanner;