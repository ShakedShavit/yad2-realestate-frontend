import React from 'react';

function ExpandArrow({ isExpanded }) {
    return (
        <div className={isExpanded ? "arrow opened-arrow" : "arrow closed-arrow"}>
            &#x2039;
        </div>
    );
}

export default ExpandArrow;