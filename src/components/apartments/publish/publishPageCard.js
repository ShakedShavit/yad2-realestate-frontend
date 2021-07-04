import React, { useContext, useEffect, useState } from 'react';
import { goToPrevPublishPageAction } from '../../../actions/apartmentPublishActions';
import { PublishApartmentContext } from '../../../context/apartmentPublishContext';
import checkSymbol from '../../../images/check.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function PublishPageCard({ children, pageNum }) {
    const baseClassName = 'publish-card';
    const finishedPageClassName = 'finished-page';
    const currPageClassName = 'curr-page';
    const laterPageClassName = 'later-page';

    const { apartmentPublishState, dispatchApartmentPublishData } = useContext(PublishApartmentContext);

    const [classList, setClassList] = useState(baseClassName);
    const [isCurrPage, setIsCurrPage] = useState(false);
    const [isFinishedPage, setIsFinishedPage] = useState(false);
    const [title, setTitle] = useState('');
    const [finishedInfo, setFinishedInfo] = useState('');

    useEffect(() => {
        if (pageNum < apartmentPublishState.currPage) {
            setIsCurrPage(false);
            setIsFinishedPage(true);
        } else if (pageNum === apartmentPublishState.currPage) {
            setIsCurrPage(true);
            setIsFinishedPage(false);
        } else {
            setIsCurrPage(false);
            setIsFinishedPage(false);
        }
    }, [apartmentPublishState.currPage, pageNum]);

    useEffect(() => {
        if (isCurrPage) return setClassList(baseClassName + ' ' + currPageClassName);
        if (isFinishedPage) return setClassList(baseClassName + ' ' + finishedPageClassName);
        setClassList(baseClassName + ' ' + laterPageClassName)
    }, [isCurrPage, isFinishedPage]);

    const goToPrevPageOnClick = (targetPage = pageNum) => {
        if (apartmentPublishState.currPage <= targetPage || targetPage < 0) return;
        dispatchApartmentPublishData(goToPrevPublishPageAction(targetPage));
    }

    return (
        <div className={classList} onClick={ () => { goToPrevPageOnClick(); }}>
            <div className="page-title">
                { isFinishedPage ?
                    <img src={checkSymbol} alt="check-symbol"></img> :
                    <div className="page-num-circle">{pageNum + 1}</div>
                }
                <div className="page-title-wrapper">
                    <h2>{title}</h2>
                    { isFinishedPage &&
                        <span className="finished-page-info">{finishedInfo}</span>
                    }
                </div>
            </div>

            { isFinishedPage &&
                <div className="edit-page-container">
                    <FontAwesomeIcon icon={faPen} />
                    <span>עריכה</span>
                </div>
            }

            {React.cloneElement(children, {
                pageNum,
                isCurrPage,
                isFinishedPage,
                setTitle,
                goToPrevPageOnClick,
                setFinishedInfo
            })}

            
        </div>
    );
}

export default PublishPageCard;