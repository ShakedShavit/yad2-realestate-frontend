import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { LoginContext } from '../../context/loginContext';

const LoginRoute = ({ component: Component, ...rest }) => {
    const { userDataState } = useContext(LoginContext);

    return (
        <Route
            { ...rest }
            component={(props) => (
                !!userDataState.user ?
                <Component { ...props } /> :
                <Redirect to='/' />
            )}
        />
    );
};

export default LoginRoute;