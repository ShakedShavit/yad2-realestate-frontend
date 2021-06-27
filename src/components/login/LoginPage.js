import React, { useContext, useEffect, useState } from 'react';
import { loginAction } from '../../actions/loginActions';
import { loginInDB } from '../../api/db/user';
import { LoginContext } from '../../context/loginContext';
import { saveUserOnCookie } from '../../cookies/userDataCookies';
import Loader from '../main/Loader';
import Notification from '../main/Notification';

function LoginPage(props) {
    const { dispatchUserData } = useContext(LoginContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isErrNotification, setIsErrNotification] = useState(false);
    const [loginErrMsg, setLoginErrMsg] = useState('');

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

    const emailInputOnChange = (e) => {
        const email = e.target.value;
        props.setEmailVal(email);

        if (isInputEmpty(e)) return setEmailErrMsg(emptyFieldErrMsg);
        const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(email)) return setEmailErrMsg("מבנה האימייל שהוזן אינו תקין ");
        
        setIsEmailValid(true);
        setEmailErrMsg('');
    }
    const passwordInputOnChange = (e) => {
        const password = e.target.value;
        props.setPasswordVal(password);

        if (isInputEmpty(e)) return setPasswordErrMsg(emptyFieldErrMsg);
        if (props.isSignup) {
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
        if (repPassword !== props.passwordVal) return;

        setIsPasswordRepValid(true);
        setPasswordRepErrMsg('');
    }

    useEffect(() => {
        if (!passwordRepVal) return;
        if (props.passwordVal !== passwordRepVal) return setPasswordRepErrMsg('סיסמה לא תואמת ');
        setPasswordRepErrMsg('');
        setIsPasswordRepValid(true);
    }, [props.passwordVal, passwordRepVal, passwordRepInputClassName]);

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

        if (props.isSignup) return props.setIsSignupSecondPage(true);

        loginInDB(props.emailVal, props.passwordVal)
        .then((res) => {
            dispatchUserData(loginAction(res));
            setIsLoading(false);
            props.setIsLoginNotification(true);
            saveUserOnCookie(res);
            props.setIsLoginModalOpen(false);
        })
        .catch((err) => {
            setIsLoading(false);
            setIsErrNotification(true);
            setLoginErrMsg(err.message);
        });
    }
    
    return (
        <>
        <form className="login-from">
            <div className="body-form">
                <label for="email">כתובת מייל</label>
                <input className={emailInputClassName} name="email" type="email" onBlur={emailInputOnChange} onChange={emailInputOnChange} placeholder="your@mail.com"></input>
                { emailErrMsg.length !== 0 && <span>{emailErrMsg}</span> }

                <label for="password">סיסמה</label>
                <input className={passwordInputClassName} name="password" type="password" onBlur={passwordInputOnChange} onChange={passwordInputOnChange} placeholder={props.isSignup ? "6 תווים, אותיות באנגלית וספרה" : "הקלד סיסמה"}></input>
                { passwordErrMsg.length !== 0 && <span>{passwordErrMsg}</span> }
            
                {
                    props.isSignup &&
                    <>
                        <input className={passwordRepInputClassName} name="password-rep" type="password" onBlur={passwordRepInputOnChange} onChange={passwordRepInputOnChange} placeholder={"חזור על הסיסמה שהקלדת"}></input>
                        { passwordRepErrMsg.length !== 0 && <span>{passwordRepErrMsg}</span> }
                    </>
                }
            </div>
            
            <div className="footer-form">
                <button onClick={onSubmit} disabled={!isEmailValid || !isPasswordValid || (props.isSignup && !isPasswordRepValid)}>
                { props.isSignup ?
                    "המשך"
                    :
                    <>
                    { isLoading ?
                        <Loader />
                        :
                        "התחבר"
                    }
                    </>
                }
                </button>

                <div>
                    <span>{props.isSignup ? "כבר רשום?" : "לא רשום?"}</span>
                    <span>&nbsp;</span>
                    <span className="link-span" onClick={() => { props.setIsSignup(!props.isSignup); }}>{props.isSignup ? "להתחברות" : "להרשמה"}</span>
                </div>
            </div>
        </form>
        
        { isErrNotification &&
            <Notification isSuccess={false} setIsNotificationOpen={setIsErrNotification} text={loginErrMsg}  />
        }
        </>
    );
}

export default LoginPage;