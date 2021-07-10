import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../../../context/loginContext';
import { PublishApartmentContext } from '../../../../context/apartmentPublishContext';
import { publishApartmentOnDB, uploadApartmentFilesOnDB } from '../../../../server/api/apartment';
import { useHistory } from 'react-router-dom';
import Notification from '../../../main/Notification';
import Loader from '../../../main/Loader';
import { resetAction } from '../../../../actions/apartmentPublishActions';
import freePlatImg from '../../../../images/rocketShip_Free.png';

function Finalization(props) {
    const { userDataState } = useContext(LoginContext);
    const { apartmentPublishState, dispatchApartmentPublishData } = useContext(PublishApartmentContext);
    const [isFailedMessageOpen, setIsFailedMessageOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        props.setTitle('סיום פרסום');
    }, []);

    const publishApartmentOnClick = () => {
        if (isLoading) return;

        publishApartmentOnDB(userDataState.token, apartmentPublishState.apartment)
        .then((res) => {
            setIsLoading(true);
            uploadApartmentFilesOnDB(userDataState.token, res, apartmentPublishState.apartment.filesFd)
            .then((result) => {
                dispatchApartmentPublishData(resetAction());
                history.push('/');
            })
            .catch((error) => {
                console.log(error);
                history.push('/');
            });
        })
        .catch((err) => {
            console.log(err);
            setIsFailedMessageOpen(true);
            setIsLoading(false);
        });

        //upload files

        //deletePublishApartmentFromCookie();
    }

    return (
        <>
        { props.isCurrPage &&
        <div className="publish-page-content finalization-page-content">
            <p>זהו, אנחנו בסוף. לנו נשאר לשמור את המודעה שלך, לך נשאר לבחור את מסלול הפרסום.</p>
            <p>המלצה שלנו?	&nbsp;<span>לשדרג</span>&nbsp;את המודעה, להופיע לפני כולם ולהתקדם להסכם תיק תק</p>
            
            <div className="divider-line"></div>

            <span className="second-headline">באיזה מסלול לפרסם את המודעה? זה הרגע לבלוט מעל כולם</span>

            <section className="plans-container">
                <div className="publish-plan-card">
                    <h2>בסיסי</h2>

                    <img src={freePlatImg} alt={'rocket-ship-free'}></img>

                        <div className="plan-description-container">
                            <div>
                                <FontAwesomeIcon className="icon" icon={faCheck} />
                                <span>מודעה רגילה בצבע אפור</span>
                            </div>
                            <div>
                                <FontAwesomeIcon className="icon" icon={faTimes} />
                                <span>הקפצה אוטומטית לחסכון בזמן</span>
                            </div>
                        </div>

                        <button onClick={publishApartmentOnClick}>{isLoading ? <Loader /> : <span>חינם<span className="desktop-btn-text"> / 120 ימים</span></span>}</button>
                </div>
            </section>
        </div>
        }

        { isFailedMessageOpen &&
            <Notification
                text={'אירעה שגיאה באתר'}
                setIsNotificationOpen={setIsFailedMessageOpen}
                isSuccess={false}
            />
        }
        </>
    );
}

export default Finalization;