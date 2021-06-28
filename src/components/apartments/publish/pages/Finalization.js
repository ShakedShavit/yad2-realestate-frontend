import React, { useEffect } from 'react';

function Finalization(props) {
    console.log(props);
    useEffect(() => {
        props.setTitle('סיום פרסום');
    });

    return (
        <div>
        </div>
    );
}

export default Finalization;