import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const ele = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, ele)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, ele)}
        </>
    );
};

export default Modal;