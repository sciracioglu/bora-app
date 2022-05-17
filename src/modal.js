import React from 'react';
import ReactDOM from "react-dom";
import './modal.css'

function Modal({handleYes, handleNo, show, children}) {
    const showHideClassName = show ? "modal display-block" : "modal display-none"

    return ReactDOM.createPortal(
        <div className={showHideClassName}>
            <section className="modal-main">
                <p><b>{children}</b></p>
                <button type="button" onClick={handleYes} className="btn btn-success vertical-center">Evet</button>
                <button type="button" onClick={handleNo} className="btn btn-danger">Hayir</button>
            </section>
        </div>,
        document.getElementById("modal")
    );
}

export default Modal;