import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isMobile } from 'react-device-detect';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function PropertyWrapper({ icon, isIncluded, propertyStr }) {
    return (
        <div className={isIncluded ? "property-wrapper__home-page" : "property-wrapper__home-page un-included-property"}>
            { !isMobile ?
                <FontAwesomeIcon className="icon" icon={icon} /> :
                <div className={isIncluded ? "property-checkbox" : "property-checkbox property-checkbox-not-included"}>
                { isIncluded ?
                    <FontAwesomeIcon className="icon" icon={faCheck} /> :
                    <FontAwesomeIcon className="icon" icon={faTimes} />
                }
                </div>
            }
            <span>{propertyStr}</span>
        </div>
    );
}

export default PropertyWrapper;