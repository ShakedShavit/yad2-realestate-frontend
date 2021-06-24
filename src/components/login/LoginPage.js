import React, { useEffect, useState } from 'react';
import WelcomeBanner from './WelcomeBanner';

function LoginPage(props) {
    const [isSignup, setIsSignup] = useState(true);

    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [passwordErrMsg, setPasswordErrMsg] = useState('');
    const [passwordRepErrMsg, setPasswordRepErrMsg] = useState('');

    const [emailInputClassName, setEmailInputClassName] = useState('');
    const [passwordInputClassName, setPasswordInputClassName] = useState('');
    const [passwordRepInputClassName, setPasswordRepInputClassName] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordRepValid, setIsPasswordRepValid] = useState(false);

    const emptyFieldErrMsg = "שדה חובה";
    const invalidInputClassName = "invalid-input";
    const validInputClassName = "valid-input";
    
    const isInputEmpty = e => e.target.value.length === 0;

    const emailInputOnBlur = (e) => {
        if (isInputEmpty(e)) setEmailErrMsg(emptyFieldErrMsg);
    }
    const passwordInputOnBlur = (e) => {
        if (isInputEmpty(e)) setPasswordErrMsg(emptyFieldErrMsg);
    }
    const passwordRepInputOnBlur = (e) => {
        if (isInputEmpty(e)) setPasswordRepErrMsg(emptyFieldErrMsg);
    }

    const emailInputOnChange = (e) => {
        if (isInputEmpty(e)) return setEmailErrMsg(emptyFieldErrMsg);
        const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(e.target.value)) return setEmailErrMsg("מבנה האימייל שהוזן אינו תקין ");
        setIsEmailValid(true);
        setEmailErrMsg('');
    }
    const passwordInputOnChange = (e) => {
        if (isInputEmpty(e)) return setPasswordErrMsg(emptyFieldErrMsg);
        setIsPasswordValid(true);
        setPasswordErrMsg('');
    }
    const passwordRepInputOnChange = (e) => {
        if (isInputEmpty(e)) return setPasswordRepErrMsg(emptyFieldErrMsg);
        setIsPasswordRepValid(true);
        setPasswordRepErrMsg('');
    }

    // useEffect(() => {
    //     if (isEmailValid) setEmailErrMsg('');
    // }, [isEmailValid]);
    // useEffect(() => {
    //     if (isPasswordValid) setPasswordErrMsg('');
    // }, [isPasswordValid]);
    // useEffect(() => {
    //     if (isPasswordRepValid) setPasswordRepErrMsg('');
    // }, [isPasswordRepValid]);

    useEffect(() => {
        if (!!emailErrMsg) setIsEmailValid(false);
    }, [emailErrMsg]);
    

    useEffect(() => {
        if (isEmailValid) return setEmailInputClassName(validInputClassName);
        if (!!emailErrMsg) return setEmailInputClassName(invalidInputClassName);
        setEmailInputClassName(validInputClassName);
    }, [emailErrMsg, isEmailValid]);
    useEffect(() => {
        !!passwordErrMsg ? setPasswordInputClassName(invalidInputClassName) : setPasswordInputClassName('');
    }, [passwordErrMsg]);
    useEffect(() => {
        !!passwordRepErrMsg ? setPasswordRepInputClassName(invalidInputClassName) : setPasswordRepInputClassName('');
    }, [passwordRepErrMsg]);

    return (
        <div className="login-page">
            <WelcomeBanner />

            <div className="header-login">
                <h3>{ isSignup ? "הרשמה" : "התחברות" }</h3>
                <p>{ isSignup ? "הזן את הפרטים כדי להירשם" : "הזן את הפרטים כדי להתחבר" }</p>
            </div>

            <form className="login-from">
                <label for="email">כתובת מייל</label>
                <input className={emailInputClassName} name="email" type="email" onBlur={emailInputOnBlur} onChange={emailInputOnChange} placeholder="your@mail.com"></input>
                { emailErrMsg.length !== 0 && <span>{emailErrMsg}</span> }

                <label for="password">סיסמה</label>
                <input className={passwordInputClassName} name="password" type="password" onBlur={passwordInputOnBlur} onChange={passwordInputOnChange} placeholder={isSignup ? "6 תווים, אותיות באנגלית וספרה" : "הקלד סיסמה"}></input>
                { passwordErrMsg.length !== 0 && <span>{passwordErrMsg}</span> }
            
                {
                    isSignup &&
                    <>
                        <input className={passwordRepInputClassName} name="password-rep" type="password" onBlur={passwordRepInputOnBlur} onChange={passwordRepInputOnChange} placeholder={"חזור על הסיסמה שהקלדת"}></input>
                        { passwordRepErrMsg.length !== 0 && <span>{passwordRepErrMsg}</span> }
                    </>
                }
                
                <button>{ isSignup ? "המשך" : "התחבר"}</button>
            </form>
        </div>
    );
}

export default LoginPage;