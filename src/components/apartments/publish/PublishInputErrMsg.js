import React, { useEffect } from 'react';

function PublishInputErrMsg({ errMsg, setErrMsg, inputValue }) {
    useEffect(() => {
        setErrMsg('');
    }, [inputValue, setErrMsg]);

    return (
        <>
        { errMsg.length !== 0 &&
            <span className="input-err-msg">{errMsg}</span>
        }
        </>
    );
}

export default PublishInputErrMsg;