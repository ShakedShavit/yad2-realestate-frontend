import React from 'react';

function SignupSecondPage(props) {
    return (
        <form className="login-from">
            <div className="body-form">
                <label for="first-name">שם פרטי</label>
                <input name="first-name" type="text"placeholder="הקלד שם פרטי"></input>

                <label for="last-name">שם משפחה</label>
                <input name="last-name" type="text" placeholder="הקלד שם משפחה"></input>
            
                <label for="telephone-number">מספר טלפון</label>
                <div>
                    <input type="tel" maxLength="7" placeholder="טלפון"></input>

                    <select placeholder="קידומת">
                        <option value="050">050</option>
                        <option value="051">051</option>
                        <option value="052">052</option>
                        <option value="053">053</option>
                        <option value="054">054</option>
                        <option value="055">055</option>
                        <option value="058">058</option>
                        <u></u>
                        <option value="קידומת">נקה</option>
                    </select>
                </div>
            </div>
            
            <div className="footer-form">
                <button>שלח</button>
            </div>
        </form>
    );
}

export default SignupSecondPage;