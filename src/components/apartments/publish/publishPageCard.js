import React, { useContext, useEffect, useState } from 'react';
import { goToPrevPublishPageAction } from '../../../actions/apartmentPublishActions';
import { PublishApartmentContext } from '../../../context/apartmentPublishContext';
import checkSymbol from '../../../images/check.png';

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
                <h2>{title}</h2>
            </div>

            {React.cloneElement(children, {
                pageNum,
                isCurrPage,
                isFinishedPage,
                setTitle,
                goToPrevPageOnClick
            })}

            
        </div>
    );
}

export default PublishPageCard;