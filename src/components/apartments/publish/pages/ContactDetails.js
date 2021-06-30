import React, { useEffect } from 'react';
import PageFooter from './PageFooter';

function ContactDetails(props) {
    useEffect(() => {
        props.setTitle('פרטים ליצירת קשר');
    });

    const validateFormOnClick = () => {
        return { isFormValid: false, newProperties: {} }
    }

    return (
        <>
        { props.isCurrPage &&
        <div className="publish-page-content">

            <PageFooter
                isCurrPage={props.isCurrPage}
                pageNum={props.pageNum}
                goToPrevPageOnClick={props.goToPrevPageOnClick}
                validateForm={validateFormOnClick}
            />
        </div>
        }
        </>
    );
}

export default ContactDetails;