import React, { useContext, useEffect, useState } from 'react';
import { loginAction } from '../../actions/loginActions';
import { loginInDB } from '../../api/db/user';
import { LoginContext } from '../../context/loginContext';
import WelcomeBanner from './WelcomeBanner';

function LoginPage({ setIsLoginModalOpen, setIsSignupSecondPage, emailVal, setEmailVal, passwordVal, setPasswordVal }) {
    const { dispatchUserData } = useContext(LoginContext);

    const [isSignup, setIsSignup] = useState(false);

    const [passwordRepVal, setPasswordRepVal] = useState('');

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
        const email = e.target.value;
        setEmailVal(email);

        if (isInputEmpty(e)) return setEmailErrMsg(emptyFieldErrMsg);
        const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(email)) return setEmailErrMsg("מבנה האימייל שהוזן אינו תקין ");
        
        setIsEmailValid(true);
        setEmailErrMsg('');
    }
    const passwordInputOnChange = (e) => {
        const password = e.target.value;
        setPasswordVal(password);

        if (isInputEmpty(e)) return setPasswordErrMsg(emptyFieldErrMsg);
        if (isSignup) {
            if (password.length < 6) return setPasswordErrMsg(' מינימום 6 תווים');
            if (!(/.*[a-z].*/.test(password))) return setPasswordErrMsg('לפחות אות קטנה אחת ');
            if (!(/.*[A-Z].*/.test(password))) return setPasswordErrMsg('לפחות אות גדולה אחת ');
            if (!(/.*[0-9].*/).test(password)) return setPasswordErrMsg('לפחות ספרה אחת ');
        }
        
        setIsPasswordValid(true);
        setPasswordErrMsg('');
    }
    const passwordRepInputOnChange = (e) => {
        const repPassword = e.target.value;
        setPasswordRepVal(repPassword);

        if (isInputEmpty(e)) return setPasswordRepErrMsg(emptyFieldErrMsg);
        if (repPassword !== passwordVal) return;

        setIsPasswordRepValid(true);
        setPasswordRepErrMsg('');
    }

    useEffect(() => {
        if (!passwordRepVal) return;
        if (passwordVal !== passwordRepVal) return setPasswordRepErrMsg('סיסמה לא תואמת ');
        setPasswordRepErrMsg('');
        setIsPasswordRepValid(true);
    }, [passwordVal, passwordRepVal, passwordRepInputClassName]);

    useEffect(() => {
        if (!!emailErrMsg) setIsEmailValid(false);
    }, [emailErrMsg]);
    useEffect(() => {
        if (!!passwordErrMsg) setIsPasswordValid(false);
    }, [passwordErrMsg]);
    useEffect(() => {
        if (!!passwordRepErrMsg) setIsPasswordRepValid(false);
    }, [passwordRepErrMsg]);

    useEffect(() => {
        if (isEmailValid) return setEmailInputClassName(validInputClassName);
        if (!!emailErrMsg) return setEmailInputClassName(invalidInputClassName);
    }, [emailErrMsg, isEmailValid]);
    useEffect(() => {
        if (isPasswordValid) return setPasswordInputClassName(validInputClassName);
        if (!!passwordErrMsg) return setPasswordInputClassName(invalidInputClassName);
    }, [passwordErrMsg, isPasswordValid]);
    useEffect(() => {
        if (isPasswordRepValid) return setPasswordRepInputClassName(validInputClassName);
        if (!!passwordRepErrMsg) return setPasswordRepInputClassName(invalidInputClassName);
    }, [passwordRepErrMsg, isPasswordRepValid]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (isSignup) return setIsSignupSecondPage(true);

        loginInDB(emailVal, passwordVal)
        .then((res) => {
            dispatchUserData(loginAction(res));
            setIsLoginModalOpen(false);
        })
        .catch((err) => {
            // TODO Send Message
        });
    }

    return (
        <form className="login-from">
            <div className="body-form">
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
            </div>
            
            <div className="footer-form">
                <button onClick={onSubmit} disabled={!isEmailValid || !isPasswordValid || (isSignup && !isPasswordRepValid)}>{ isSignup ? "המשך" : "התחבר"}</button>
                <div>
                    <span>{isSignup ? "כבר רשום?" : "לא רשום?"}</span>
                    <span>&nbsp;</span>
                    <span className="switch-forms-link" onClick={() => { setIsSignup(!isSignup); }}>{isSignup ? "להתחברות" : "להרשמה"}</span>
                </div>
            </div>
        </form>
    );
}

export default LoginPage;