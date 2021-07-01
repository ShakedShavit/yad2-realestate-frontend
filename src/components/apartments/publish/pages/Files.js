import React, { useEffect, useRef } from 'react';
import PageFooter from './PageFooter';
import AdviceMessage from '../AdviceMessage';
import lightBulbIcon from '../../../../images/light-bulb-on.png';
import FileInput from '../FileInput';

function Files(props) {
    const formRef = useRef(null);

    useEffect(() => {
        props.setTitle('תמונות וסרטונים');
    }, []);

    const validateFormOnClick = () => {
        return { isFormValid: true, newProperties: {
            filesFd: new FormData(formRef.current)
        }}
    }

    return (
        <>
        { props.isCurrPage &&
        <div className="publish-page-content files-page-content">
            <AdviceMessage
                img={lightBulbIcon}
                imgAlt={"light-bulb-icon"}
                title={"גם לנו היה קשה להאמין!"}
                message={"לא לדאוג, גם אם רואים את התמונה באופן לא ברור כעת, לאחר הפרסום הכל יראה כמו שצריך"}
            />

            <p>
                <span>ידעת שמודעות עם תמונות ברורות מקבלות פי 10 יותר פניות? </span>
                <span>לא להסס להעלות לפה תמונות (אפשר עד 10 + וידאו) ולהבליט את הצדדים הטובים ביותר של הנכס</span>
            </p>

            <form ref={formRef} className="form-body">
                <div className="files-inputs-wrapper main-files-inputs__wrapper">
                    <FileInput
                        isImage={false}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={true}
                    />
                </div>

                <hr></hr>

                <label className="files-label">תמונות שיופיעו בגוף המודעה</label>
                <div className="files-inputs-wrapper">
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                    <FileInput
                        isImage={true}
                        isMainImage={false}
                    />
                </div>
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

export default Files;