import React from 'react';

function Switcher(props) {
    return (
        <div className="switcher">
        { props.options.map((option, index) => {
            return (
                <div
                    key={index}
                    className={props.chosenOption === option ? "publish-property-option switcher-option chosen-property-option chosen-switcher-option" : "publish-property-option switcher-option"}
                    onClick={ () => { props.setChosenOption(option) } }
                >
                    {option}
                </div>
            )
        }) }
        </div>
    );
}

export default Switcher;