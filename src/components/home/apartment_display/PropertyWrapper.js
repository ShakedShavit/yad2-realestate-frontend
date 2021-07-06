import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PropertyWrapper({ icon, isIncluded, propertyStr }) {
    return (
        <div className={isIncluded ? "property-wrapper__home-page" : "property-wrapper__home-page un-included-property"}>
            <FontAwesomeIcon className="icon" icon={icon} />
            <span>{propertyStr}</span>
        </div>
    );
}

export default PropertyWrapper;