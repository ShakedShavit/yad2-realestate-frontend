import React, { useContext, useEffect } from 'react';
import Header from '../../apartments/publish/Header';
import PublishPageCard from './PublishPageCard';
import Address from './pages/Address';
import Properties from './pages/Properties';
import PaymentAndDates from './pages/PaymentAndDates';
import Files from './pages/Files';
import ContactDetails from './pages/ContactDetails';
import Finalization from './pages/Finalization';
import { PublishApartmentContext } from '../../../context/apartmentPublishContext';
import { savePublishApartmentOnCookie } from '../../../cookies/publishApartmentCookies';

function PublishApartment() {
    const { apartmentPublishState } = useContext(PublishApartmentContext);

    useEffect(() => {
        savePublishApartmentOnCookie(apartmentPublishState);
    }, [apartmentPublishState.currPage]);

    return (
        <>
        <Header />
        
        <div className="publish-page-wrapper">
            <PublishPageCard
                pageNum={0}
            >
                <Address />
            </PublishPageCard>

            <PublishPageCard
                pageNum={1}
            >
                <Properties />
            </PublishPageCard>

            <PublishPageCard
                pageNum={2}
            >
                <PaymentAndDates />
            </PublishPageCard>

            <PublishPageCard
                pageNum={3}
            >
                <Files />
            </PublishPageCard>

            <PublishPageCard
                pageNum={4}
            >
                <ContactDetails />
            </PublishPageCard>

            <PublishPageCard
                pageNum={5}
            >
                <Finalization />
            </PublishPageCard>
        </div>
        </>
    );
}

export default PublishApartment;