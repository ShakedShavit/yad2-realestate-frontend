import React from 'react';

function CloseSymbol({ closeFunc, classNames }) {
    return (
        <button className={"close-button " + classNames} onClick={closeFunc}><div></div><div></div></button>
    );
}

export default CloseSymbol;