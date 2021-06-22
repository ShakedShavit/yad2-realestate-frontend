import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div>
            404
            <br></br>עמוד לא נמצא
            <br></br><NavLink to="/">חזרה לעמוד הבית</NavLink>
        </div>
    );
}

export default NotFoundPage;