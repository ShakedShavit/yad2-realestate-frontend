import React, { createContext, useReducer } from 'react';
import { getPublishApartmentFromCookie } from '../cookies/publishApartmentCookies';
import apartmentPublishReducer, { initialApartmentPublishState } from '../reducers/publishApartmentReducer';

export const PublishApartmentContext = createContext();

function PublishApartmentContextProvider(props) {
    const cookiesPublishApartmentData = getPublishApartmentFromCookie();
    const [apartmentPublishState, dispatchApartmentPublishData] = useReducer(apartmentPublishReducer, cookiesPublishApartmentData || initialApartmentPublishState);

    return (
        <PublishApartmentContext.Provider value={ { apartmentPublishState, dispatchApartmentPublishData } }>
            { props.children }
        </PublishApartmentContext.Provider>
    );
}

export default PublishApartmentContextProvider;