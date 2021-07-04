import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../../context/loginContext';
import PageFooter from './PageFooter';
import PublishInputErrMsg from '../PublishInputErrMsg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

function ContactDetails(props) {
    const { userDataState } = useContext(LoginContext);

    const [publisherName, setPublisherName] = useState(userDataState.user.firstName + " " + userDataState.user.lastName);
    const [telNum, setTelNum] = useState(userDataState.user.phoneNumber.substring(3));
    const [startTelNum, setStartTelNum] = useState(userDataState.user.phoneNumber.substring(0, 3));
    const [email, setEmail] = useState(userDataState.user.email);
    const [checkboxVal, setCheckboxVal] = useState(false);
    const [canBeInContactOnWeekends, setCanBeInContactOnWeekends] = useState(false);
    const [isNewContactInputOpen, setIsNewContactInputOpen] = useState(false);
    const [isPublisherValid, setIsPublisherValid] = useState(false);

    const [isNewContactValid, setIsNewContactValid] = useState(false);
    const [newContactName, setNewContactName] = useState('');
    const [newContactTelNum, setNewContactTelNum] = useState('');
    const [newContactStartTelNum, setNewContactStartTelNum] = useState('050');
    const [isPublisherValidErrMsg, setIsPublisherValidErrMsg] = useState(false);

    const [publisherNameErrMsg, setPublisherNameErrMsg] = useState('');
    const [telNumErrMsg, setTelNumErrMsg] = useState('');
    const [emailErrMsg, setEmailErrMsg] = useState('');
    const [checkboxErrMsg, setCheckboxErrMsg] = useState('');

    const [isNewContactValidErrMsg, setIsNewContactValidErrMsg] = useState('');
    const [newContactTelNumErrMsg, setNewContactTelNumErrMsg] = useState('');

    const telNumRegEx = new RegExp(/^[0-9]+$/);
    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    useEffect(() => {
        props.setTitle('פרטים ליצירת קשר');
    }, []);

    const removeNewContactOnClick = () => {
        setIsNewContactInputOpen(false);
        setIsNewContactValid(false);
        setNewContactTelNum('');
    }

    const validateContact = () => {
        if (!telNumRegEx.test(telNum) || telNum.length !== 7) {
            setIsPublisherValid(false);
            setIsPublisherValidErrMsg('אנא אמת מספר');
            setTelNumErrMsg('לא תקין טלפון ראשי');
            return;
        }
        setIsPublisherValid(true);
    }

    const validateNewContact = () => {
        if (!telNumRegEx.test(newContactTelNum) || newContactTelNum.length + newContactStartTelNum.length !== 10) {
            setIsNewContactValid(false);
            setIsNewContactValidErrMsg('אנא אמת מספר');
            setNewContactTelNumErrMsg('לא חוקי טלפון נוסף');
            return;
        }
        setIsNewContactValid(true);
    }

    const validateFormOnClick = () => {
        let isFormValid = true;

        if (!isPublisherValid) {
            setIsPublisherValidErrMsg('אנא אמת מספר');
            isFormValid = false;
        }
        if (isNewContactInputOpen && !isNewContactValid) {
            setIsNewContactValidErrMsg('אנא אמת מספר');
            isFormValid = false;
        }

        if (!publisherName) {
            setPublisherNameErrMsg('שדה חובה שם איש קשר');
            isFormValid = false;
        }
        if (!!email && !emailPattern.test(email)) {
            setEmailErrMsg('שדה לא חוקי דוא"ל');
            isFormValid = false;
        }
        if (!checkboxVal) {
            setCheckboxErrMsg('חובה לסמן אם תרצו להמשיך');
            isFormValid = false;
        }

        if (isFormValid) props.setFinishedInfo(`${telNum} - ${startTelNum} - ${publisherName}`);
        else props.setFinishedInfo('');

        const publishers = [{
            publisherName,
            phoneNumber: startTelNum + telNum,
            canBeInContactOnWeekends
        }];
        if (isNewContactInputOpen) publishers.push({
            publisherName: newContactName,
            phoneNumber: newContactStartTelNum + newContactTelNum,
            canBeInContactOnWeekends: false
        });

        return { isFormValid, newProperties: isFormValid ? {
            publisher: userDataState.user._id,
            contactEmail: email,
            publishers
        } : {} };
    }

    return (
        <>
        { props.isCurrPage &&
        <div className="publish-page-content contact-page-content">
            <form className="form-body">
                <label>שם איש קשר<b>*</b></label>
                <input type="text" onChange={(e) => { setPublisherName(e.target.value); }} defaultValue={userDataState.user.firstName + " " + userDataState.user.lastName}></input>
                <PublishInputErrMsg errMsg={publisherNameErrMsg} setErrMsg={setPublisherNameErrMsg} inputValue={publisherName} />
            
                <label>טלפון ראשי<b>*</b></label>
                <div className="phone-number-wrapper">
                    <input type="tel" maxLength="7" defaultValue={userDataState.user.phoneNumber.substring(3)} onChange={(e) => { setTelNum(e.target.value); setIsPublisherValid(false); }}></input>

                    <select defaultValue={userDataState.user.phoneNumber.substring(0, 3)} onChange={(e) => { setStartTelNum(e.target.value); }}>
                        <option value="050">050</option>
                        <option value="051">051</option>
                        <option value="052">052</option>
                        <option value="053">053</option>
                        <option value="054">054</option>
                        <option value="055">055</option>
                        <option value="058">058</option>
                    </select>
                </div>
                <PublishInputErrMsg errMsg={telNumErrMsg} setErrMsg={setTelNumErrMsg} inputValue={telNum} />

                { isPublisherValid ?
                    <button type="button" className="contact-button valid-contact-button" onClick={validateContact}>
                        <FontAwesomeIcon className="contact-icon" icon={faCheck} />
                        המספר אומת
                    </button>
                    :
                    <button type="button" className="contact-button invalid-contact-button" onClick={validateContact}>
                        <FontAwesomeIcon className="contact-icon" icon={faCheck} />
                        אימות מספר טלפון
                    </button>
                }
                <PublishInputErrMsg errMsg={isPublisherValidErrMsg} setErrMsg={setIsPublisherValidErrMsg} inputValue={isPublisherValid} />

                { isNewContactInputOpen ?
                    <>
                    <div className="new-contact-info-container">
                        <label>איש קשר נוסף</label>
                        <input type="text" onChange={(e) => { setNewContactName(e.target.value); }}></input>

                        <label>טלפון נוסף</label>
                        <div className="phone-number-wrapper">
                            <input type="tel" maxLength="8" onChange={(e) => { setNewContactTelNum(e.target.value); setIsNewContactValid(false); }}></input>
                            <select onChange={(e) => { setNewContactStartTelNum(e.target.value); setNewContactTelNumErrMsg(''); setIsNewContactValid(false); }}>
                                <option value="050">050</option>
                                <option value="051">051</option>
                                <option value="052">052</option>
                                <option value="053">053</option>
                                <option value="054">054</option>
                                <option value="055">055</option>
                                <option value="058">058</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="077">077</option>
                                <option value="073">073</option>
                                <option value="077">077</option>
                                <option value="073">073</option>
                                <option value="072">072</option>
                                <option value="074">074</option>
                                <option value="076">076</option>
                                <option value="078">078</option>
                                <option value="079">079</option>
                            </select>
                        </div>
                        <PublishInputErrMsg errMsg={newContactTelNumErrMsg} setErrMsg={setNewContactTelNumErrMsg} inputValue={newContactTelNum} />

                        <div className="new-contact-footer">
                            { isNewContactValid ?
                                <button type="button" className="contact-button valid-contact-button" onClick={validateNewContact}>
                                    <FontAwesomeIcon className="contact-icon" icon={faCheck} />
                                    המספר אומת
                                </button>
                                :
                                <button type="button" className="contact-button invalid-contact-button" onClick={validateNewContact}>
                                    <FontAwesomeIcon className="contact-icon" icon={faCheck} />
                                    אימות מספר טלפון
                                </button>
                            }
                            
                            <div onClick={removeNewContactOnClick} className="remove-new-contact__container">
                                <FontAwesomeIcon icon={faTrashAlt} />
                                <span>ביטול</span>
                            </div>
                        </div>
                        <PublishInputErrMsg errMsg={isNewContactValidErrMsg} setErrMsg={setIsNewContactValidErrMsg} inputValue={isNewContactValid} />
                    </div>
                    </>
                    :
                    <div onClick={() => { setIsNewContactInputOpen(true); }} className="add-contact-container">
                        <FontAwesomeIcon className="link-span" icon={faPlusCircle} />
                        <span className="link-span">הוספת איש קשר נוסף</span>
                    </div>
                }

                <div className="checkbox-container checkbox-container__contact-on-weekend">
                    <input className="smaller-checkbox" type="checkbox" onClick={(e) => { setCanBeInContactOnWeekends(e.target.checked); }}></input>
                    <span>אני רוצה לקבל שיחות גם בסופי שבוע</span>
                </div>

                <label>דוא"ל</label>
                <input type="email" defaultValue={userDataState.user.email} onChange={(e) => { setEmail(e.target.value); }}></input>
                <PublishInputErrMsg errMsg={emailErrMsg} setErrMsg={setEmailErrMsg} inputValue={email} />

                <div className="checkbox-container checkbox-container-required">
                    <input type="checkbox" onClick={(e) => { setCheckboxVal(e.target.checked); }}></input>
                    <span>קראתי ואישרתי את&#160;<span className="link-span">התקנון,</span>&#160;זה חשוב<b>*</b></span>
                </div>
                <PublishInputErrMsg errMsg={checkboxErrMsg} setErrMsg={setCheckboxErrMsg} inputValue={checkboxVal} />
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

export default ContactDetails;