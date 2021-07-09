import React, { useContext, useEffect, useState } from 'react';
import { loginAction } from '../../actions/loginActions';
import { signupInDB } from '../../server/api/user';
import { LoginContext } from '../../context/loginContext';
import { saveUserOnCookie } from '../../cookies/userDataCookies';
import Loader from '../main/Loader';
import Notification from '../main/Notification';
import { useHistory } from 'react-router-dom';

function SignupSecondPage(props) {
    const { dispatchUserData } = useContext(LoginContext);

    const history = useHistory();

    const [isErrNotification, setIsErrNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstNameVal, setFirstNameVal] = useState('');
    const [lastNameVal, setLastNameVal] = useState('');
    const [telNumVal, setTelNumVal] = useState('');
    const [startTelNumVal, setStartTelNumVal] = useState('');
    const [dateVal, setDateVal] = useState('');
    const [checkboxVal, setCheckboxVal] = useState(false);

    const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
    const [lastNameErrMsg, setLastNameErrMsg] = useState('');
    const [telNumErrMsg, setTelNumErrMsg] = useState('');
    const [checkboxErrMsg, setCheckboxErrMsg] = useState('');

    const [firstNameClassName, setFirstNameClassName] = useState('');
    const [lastNameClassName, setLastNameClassName] = useState('');
    const [telNameClassName, setTelNumClassName] = useState('');

    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [isTelNumValid, setIsTelNumValid] = useState(false);

    const emptyFieldErrMsg = "שדה חובה";
    const nonLettersFieldErrMsg = "אותיות בלבד";
    const invalidInputClassName = "invalid-input";
    const validInputClassName = "valid-input";
    const lettersRegEx = new RegExp(/^[a-zA-Zא-ת]+$/);
    const telNumRegEx = new RegExp(/^[0-9]+$/);

    const firstNameOnChange = (e) => {
        const firstName = e.target.value;
        setFirstNameVal(firstName);

        if (firstName.length === 0) return setFirstNameErrMsg(emptyFieldErrMsg);
        if (!lettersRegEx.test(firstName)) return setFirstNameErrMsg(nonLettersFieldErrMsg);

        setIsFirstNameValid(true);
        setFirstNameErrMsg('');
    }

    const lastNameOnChange = (e) => {
        const lastName = e.target.value;
        setLastNameVal(lastName);

        if (lastName.length === 0) return setLastNameErrMsg(emptyFieldErrMsg);
        if (!lettersRegEx.test(lastName)) return setLastNameErrMsg(nonLettersFieldErrMsg);

        setIsLastNameValid(true);
        setLastNameErrMsg('');
    }

    const telNumOnChange = (e) => {
        const telNum = e.target.value;
        setTelNumVal(telNum);
        const telNumLen = telNum.length;

        if (telNumLen === 0) return setTelNumErrMsg(emptyFieldErrMsg);
        if (!telNumRegEx.test(telNum) || telNumLen !== 7) return setTelNumErrMsg('מספר פלאפון לא תקין');

        setIsTelNumValid(true);
        return setTelNumErrMsg('');
    }

    const startTelNumOnChange = (e) => {
        setStartTelNumVal(e.target.value);
    }

    const dateOnChange = (e) => {
        setDateVal(e.target.value);
    }

    const checkboxOnClick = (e) => {
        const isCheckboxMarked = e.target.checked;
        setCheckboxVal(isCheckboxMarked);
        if (!isCheckboxMarked) return setCheckboxErrMsg(emptyFieldErrMsg);
        setCheckboxErrMsg('');
    }

    useEffect(() => {
        if (!!firstNameErrMsg) setIsFirstNameValid(false);
    }, [firstNameErrMsg]);
    useEffect(() => {
        if (!!lastNameErrMsg) setIsLastNameValid(false);
    }, [lastNameErrMsg]);
    useEffect(() => {
        if (!!telNumErrMsg) setIsTelNumValid(false);
    }, [telNumErrMsg]);

    useEffect(() => {
        if (isFirstNameValid) return setFirstNameClassName(validInputClassName);
        if (!!firstNameErrMsg) return setFirstNameClassName(invalidInputClassName);
    }, [firstNameErrMsg, isFirstNameValid]);
    useEffect(() => {
        if (isLastNameValid) return setLastNameClassName(validInputClassName);
        if (!!lastNameErrMsg) return setLastNameClassName(invalidInputClassName);
    }, [lastNameErrMsg, isLastNameValid]);
    useEffect(() => {
        if (isTelNumValid) return setTelNumClassName(validInputClassName);
        if (!!telNumErrMsg) return setTelNumClassName(invalidInputClassName);
    }, [telNumErrMsg, isTelNumValid]);

    const signupOnSubmit = (e) => {
        e.preventDefault();
        if (isLoading) return;
        
        setIsLoading(true);

        signupInDB(props.emailVal, props.passwordVal, firstNameVal, lastNameVal, '' + startTelNumVal + telNumVal, dateVal)
        .then((res) => {
            dispatchUserData(loginAction(res));
            setIsLoading(false);
            props.setIsLoginNotification(true);
            saveUserOnCookie(res);
            props.setIsLoginModalOpen(false);

            if (props.isGoToPublish) history.push('/publish');
        })
        .catch((err) => {
            setIsLoading(false);
            setIsErrNotification(true);
        });
    }

    return (
        <>
        <form onSubmit={signupOnSubmit} className="login-from second-signup-form">
            <div className="form-body">
                <label>שם פרטי</label>
                <input name="first-name" type="text" placeholder="הקלד שם פרטי" className={firstNameClassName} onChange={firstNameOnChange} onBlur={firstNameOnChange}></input>
                { firstNameErrMsg.length !== 0 && <span className="input-err-msg">{firstNameErrMsg}</span> }

                <label>שם משפחה</label>
                <input name="last-name" type="text" placeholder="הקלד שם משפחה" className={lastNameClassName} onChange={lastNameOnChange} onBlur={lastNameOnChange}></input>
                { lastNameErrMsg.length !== 0 && <span className="input-err-msg">{lastNameErrMsg}</span> }
                
                <label>מספר טלפון</label>
                <div>
                    <input type="tel" maxLength="7" placeholder="טלפון" className={telNameClassName} onChange={telNumOnChange} onBlur={telNumOnChange}></input>

                    <select defaultValue="קידומת" onChange={startTelNumOnChange}>
                        <option value="050">050</option>
                        <option value="051">051</option>
                        <option value="052">052</option>
                        <option value="053">053</option>
                        <option value="054">054</option>
                        <option value="055">055</option>
                        <option value="058">058</option>
                    </select>
                </div>
                { telNumErrMsg.length !== 0 && <span className="input-err-msg">{telNumErrMsg}</span> }

                <label>תאריך לידה</label>
                <input type="date" max="2003-12-31" onChange={dateOnChange} placeholder="בחר תאריך לידה"></input>
            </div>

            <div className="checkbox-form">
                <input type="checkbox" onClick={checkboxOnClick}></input>
                <span>קראתי ומאשר את <span className="link-span">תקנון</span> האתר</span>
            </div>
            { checkboxErrMsg.length !== 0 && <span className="input-err-msg">{checkboxErrMsg}</span> }

            <div>
                <input type="checkbox" onClick={checkboxOnClick}></input>
                <span>מאשר קבלת דיוור פרסומי כללי מיד2</span>
            </div>
            
            
            <div className="footer-form">
                <button type="submit" disabled={!isFirstNameValid || !isLastNameValid || !isTelNumValid || !checkboxVal}>
                { isLoading ?
                    <Loader />
                    :
                    "שלח"
                }
                </button>
            </div>
        </form>

        { isErrNotification && <Notification isSuccess={false} text={"שגיאה כללית אירעה"} setIsNotificationOpen={setIsErrNotification} /> }
        </>
    );
}

export default SignupSecondPage;