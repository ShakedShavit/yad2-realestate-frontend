import React, { useState, useEffect, useRef } from 'react';
import PageFooter from './PageFooter';
import AdviceMessage from '../AdviceMessage';
import lightBulbIcon from '../../../../images/light-bulb-on.png';
import commaNumber from 'comma-number';
import PublishInputErrMsg from '../PublishInputErrMsg';

function PaymentAndDates(props) {
    const [builtSqm, setBuiltSqm] = useState('');
    const [totalSqm, setTotalSqm] = useState('');
    const [cost, setCost] = useState('');
    const [entranceDate, setEntranceDate] = useState('');
    const [isEntranceImmediate, setIsEntranceImmediate] = useState(false);
    const [minDate, setMinDate] = useState('');

    const [totalSqmErrMsg, setTotalSqmErrMsg] = useState('');
    const [priceErrMsg, setPriceErrMsg] = useState('');
    const [dateErrMsg, setDateErrMsg] = useState('');

    const costRef = useRef(null);

    useEffect(() => {
        props.setTitle('תשלומים, תאריכים ועוד ');
    });

    useEffect(() => {
        const date = new Date();
        const day = date.getDate().length === 1 ? "0" + date.getDate() : date.getDate();
        const month = (`${date.getMonth() + 1}`).length === 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
        setMinDate(`${date.getFullYear()}-${month}-${day}`);
    }, []);

    const costInputOnChange = (e) => {
        setCost(e.target.value.replace(/,/g, ''));
    }

    useEffect(() => {
        if (!!costRef.current) costRef.current.value = commaNumber(cost);
    }, [cost]);

    useEffect(() => {
        setDateErrMsg('');
    }, [isEntranceImmediate]);

    const validateFormOnClick = () => {
        let isFormValid = true;

        if (totalSqm === '') {
            setTotalSqmErrMsg('שדה חובה גודל במ"ר סך הכל');
            isFormValid = false;
        }
        if (cost !== '' && isNaN(cost)) {
            setPriceErrMsg('אנא הזן ספרות בלבד מחיר');
            isFormValid = false;
        } else if (cost < 100000) {
            setPriceErrMsg('סכום מינימלי לפרסום הינו ₪100,000 מחיר');
            isFormValid = false;
        }
        
        if (!isEntranceImmediate && entranceDate === '') {
            setDateErrMsg('שדה חובה תאריך כניסה');
            isFormValid = false;
        }
        

        const date = new Date();
        let entranceDateVal = entranceDate;
        if (isEntranceImmediate) {
            const day = date.getDate().length === 1 ? "0" + date.getDate() : date.getDate();
            const month = (`${date.getMonth() + 1}`).length === 1 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            entranceDateVal = `${month}-${day}-${date.getFullYear()}`;
        }
        
        return { isFormValid, newProperties: isFormValid ? {
            'builtSqm': builtSqm,
            'totalSqm': totalSqm,
            'price': cost,
            'date': entranceDateVal,
            'isImmediate': isEntranceImmediate
        } : {} }
    }

    return (
        <>
        { props.isCurrPage &&
        <div className="publish-page-content payment-and-dates__page-content">
            <AdviceMessage
                img={lightBulbIcon}
                imgAlt={"light-bulb-icon"}
                title={"גם לנו היה קשה להאמין!"}
                message={"מודעות שעולות עם מחירים לא עגולים מוכרות מהר יותר"}
            />
            
            <form className="form-body">
                <label>מ"ר בנוי</label>
                <input type="number" min="0" placeholder='כמה מ"ר יש בנכס' onChange={(e) => { setBuiltSqm(e.target.value) }}></input>

                <label>גודל במ"ר סף הכל<b>*</b></label>
                <input type="number" min="0" onChange={(e) => { setTotalSqm(e.target.value) }}></input>
                <PublishInputErrMsg errMsg={totalSqmErrMsg} setErrMsg={setTotalSqmErrMsg} inputValue={totalSqm} />

                <label>מחיר</label>
                <input ref={costRef} type="text" min="100000" placeholder='סכום מינימלי 100,000' onChange={costInputOnChange}></input>
                <PublishInputErrMsg errMsg={priceErrMsg} setErrMsg={setPriceErrMsg} inputValue={cost} />

                <label>תאריך כניסה<b>*</b></label>
                <div className="date-properties-container">
                    <input type="date" min={minDate} disabled={isEntranceImmediate} onChange={(e) => { setEntranceDate(e.target.value) }}></input>
                    <div className="checkbox-container">
                        <input type="checkbox" onChange={(e) => { setIsEntranceImmediate(e.target.checked); }}></input>
                        <span>מיידי</span>
                    </div>
                </div>
                <PublishInputErrMsg errMsg={dateErrMsg} setErrMsg={setDateErrMsg} inputValue={entranceDate} />
            </form>

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

export default PaymentAndDates;