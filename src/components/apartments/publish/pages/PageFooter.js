import React, { useContext } from 'react';
import { goToNextPublishPageAction } from '../../../../actions/apartmentPublishActions';
import { PublishApartmentContext } from '../../../../context/apartmentPublishContext';
import { deletePublishApartmentFromCookie } from '../../../../cookies/publishApartmentCookies';

function PageFooter(props) {
    const { apartmentPublishState, dispatchApartmentPublishData } = useContext(PublishApartmentContext);

    const goToNextPageOnClick = () => {
        const { isFormValid, newProperties } = props.validateForm();
        if (!isFormValid) return;

        if (apartmentPublishState.maxPage === props.pageNum) {
            //TODO SEND REQUEST TO THE SERVER

            deletePublishApartmentFromCookie();
            return;
        }
        dispatchApartmentPublishData(goToNextPublishPageAction(newProperties));
    }

    return (
        <>
        { props.isCurrPage &&
            <div className="publish-card-footer">
                <button onClick={() => { props.goToPrevPageOnClick(props.pageNum - 1); }}>חזרה</button>
                <button const onClick={() => { goToNextPageOnClick(); }}>המשך</button>
            </div>
        }
        </>
    );
}

export default PageFooter;