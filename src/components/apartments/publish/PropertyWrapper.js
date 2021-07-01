import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PropertyWrapper({ value, chosenProperties, setChosenProperties, icon }) {
    const propertyOptionOnClick = () => {
        if (chosenProperties.includes(value)) {
            let newChosenProperties = [];
            let removePropertyIndex = chosenProperties.indexOf(value);
            for (let i = 0; i < chosenProperties.length; i++)
                if (i !== removePropertyIndex) newChosenProperties.push(chosenProperties[i]);
            return setChosenProperties(newChosenProperties);
        }
        setChosenProperties([ ...chosenProperties, value ]);
    }

    return (
        <div
            className={chosenProperties.includes(value) ? 'publish-property-option chosen-property-option' : 'publish-property-option'}
            onClick={propertyOptionOnClick}
        >
            <FontAwesomeIcon className="property-icon" icon={icon} />
            <span>{value}</span>
        </div>
    );
}

export default PropertyWrapper;