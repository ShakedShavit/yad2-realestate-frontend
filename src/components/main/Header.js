import React from 'react';
import { useHistory } from 'react-router-dom';
import yad2Logo from '../../images/yad2-logo.png';

function Header(props) {
    const history = useHistory();
    console.log(history.length);

    return (
        <div>
            {history.length > 1 && <button onClick={() => { history.goBack() }}>{"<"}</button> }
            <img src={yad2Logo} alt="yad2-logo" />
            <div className="nav-bar"></div>
        </div>
    );
}

export default Header;