import React from 'react';
import { NavLink } from 'react-router-dom';

function PublishButton() {
    return (
        <NavLink className="publish-ad__link" to="/publish">פרסום מודעה</NavLink>
    );
}

export default PublishButton;