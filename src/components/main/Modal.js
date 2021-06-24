import React from 'react';
import CloseSymbol from './CloseSymbol';

function Modal(props) {
    return (
        <div className="modal-wrapper flex-center">
            <div className="modal">
                <CloseSymbol closeFunc={ () => { props.setIsModalOpen(false); }} classNames={"modal-close"} />
                { props.children }
            </div>
        </div>
    );
}

export default Modal;