import React, { useContext } from 'react';
import { goToNextPublishPageAction } from '../../../../actions/apartmentPublishActions';
import { PublishApartmentContext } from '../../../../context/apartmentPublishContext';

function PageFooter(props) {
    const { apartmentPublishState, dispatchApartmentPublishData } = useContext(PublishApartmentContext);

    const goToNextPageOnClick = () => {
        const { isFormValid, newProperties } = props.validateForm();

        if (!isFormValid || apartmentPublishState.maxPage === props.pageNum) return;

        dispatchApartmentPublishData(goToNextPublishPageAction(newProperties));
    }

    return (
        <>
        { props.isCurrPage &&
            <div className="publish-card-footer">
                <button onClick={() => { props.goToPrevPageOnClick(props.pageNum - 1); }}>חזרה</button>
                <button onClick={() => { goToNextPageOnClick(); }}>המשך</button>
            </div>
        }
        </>
    );
}

export default PageFooter;