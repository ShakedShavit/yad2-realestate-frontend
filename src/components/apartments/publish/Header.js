import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import yad2LogoOrange from '../../../images/yad2-logo.png';
import userIcon from '../../../images/user-icon-orange.png';
import { LoginContext } from '../../../context/loginContext';
import CloseSymbol from '../../main/CloseSymbol';

function Header() {
    const history = useHistory();

    const { userDataState } = useContext(LoginContext);

    const closePublishPage = () => {
        history.push('/fdsf');
    }

    return (
        <div className="publish-header">
            <div className="right-side">
                <img src={yad2LogoOrange} alt="yad2-logo" className="logo"></img>
                <span className="headline">פרסום מודעה חדשה</span>
            </div>

            <div className="header-info">
                <img src={userIcon} alt="user-icon" className="user-icon"></img>
                <span>{userDataState.user.firstName + " " + userDataState.user.lastName}</span>

                <CloseSymbol closeFunc={closePublishPage} classNames={"circle-border"} />
            </div>
        </div>
    );
}

export default Header;