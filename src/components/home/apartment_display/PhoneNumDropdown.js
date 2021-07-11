import React from 'react';
import DividerLine from '../advanced_search/types_selector/DividerLine';

function PhoneNumDropdown({ publishers }) {
    return (
        <div className="phone-number-dropdown">
            <span>{publishers[0].publisherName}</span>
            <DividerLine />
            { publishers.map((publisher, index) => {
                return (
                    <div className="phone-num" key={index}>{publisher.phoneNumber}</div>
                )
            })}
        </div>
    );
}

export default PhoneNumDropdown;