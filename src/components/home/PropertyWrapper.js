import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PropertyWrapper({ icon, isIncluded, propertyStr }) {
    return (
        <div className="property-wrapper__home-page">
            <FontAwesomeIcon className={isIncluded ? "included-property" : ""} icon={icon} />
            <span>{propertyStr}</span>
        </div>
    );
}

export default PropertyWrapper;