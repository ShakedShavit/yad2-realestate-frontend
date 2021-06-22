import React from 'react';
import { useHistory } from 'react-router-dom';
import yad2Logo from '../../images/yad2-logo.png';

function Header(props) {
    const history = useHistory();
    console.log(history.goBack());

    return (
        <div>
            <img src={yad2Logo} alt="yad2-logo" />
        </div>
    );
}

export default Header;