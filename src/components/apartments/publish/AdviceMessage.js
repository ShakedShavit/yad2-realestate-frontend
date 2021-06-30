import React from 'react';

function AdviceMessage({ img, imgAlt, title, message }) {
    return (
        <div className="advice-wrapper">
            <div className="video-icon-container"><img src={img} alt={imgAlt}></img></div>
            <div>
                <h4>{title}</h4>
                <span>{message}</span>
            </div>
        </div>
    );
}

export default AdviceMessage;