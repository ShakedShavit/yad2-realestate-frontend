import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginContextProvider from '../../context/loginContext';
import PublishApartment from '../apartments/publish/PublishApartment';
import HomePage from '../home/HomePage';
import NotFoundPage from '../main/NotFoundPage';
import LoginRouter from './LoginRouter';

function AppRouter() {
    return (
        <BrowserRouter>
            <LoginContextProvider>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/realestate/forsale" />
                    </Route>
                    <Route path="/realestate" exact>
                        <Redirect to="/realestate/forsale" />
                    </Route>
                    <Route path="/realestate/forsale" component={HomePage} exact />
                    <LoginRouter path="/publish" component={PublishApartment} exact />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </LoginContextProvider>
        </BrowserRouter>
    );
}

export default AppRouter;