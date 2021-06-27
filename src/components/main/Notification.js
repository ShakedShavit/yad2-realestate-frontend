  
import React, { useEffect } from 'react'
import CloseSymbol from './CloseSymbol';
import checkIcon from '../../images/check.png';

const Notification = ({ text, setIsNotificationOpen, isSuccess }) => {
    const closeNotification = () => {
        setIsNotificationOpen(false);
    }

    useEffect(() => {
        setTimeout(() => { setIsNotificationOpen(false); }, 4000);
    }, []);

    return (
        <div className="notification-container">
            <div className="notification-body">
            { isSuccess ?
                <img src={checkIcon} alt={"success-icon"}></img>
                :
                <CloseSymbol closeFunc={() => {}} />
            }
                <span>{text}</span>
            </div>

            <CloseSymbol closeFunc={closeNotification} classNames={"close-notification"} />       
        </div>
    )
}

export default Notification;