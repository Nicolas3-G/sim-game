import { useEffect, useRef } from "react"
import styles from "./ModalMessageBox.module.css"

const ModalMessageBox = ({ modalMessageList }) => {
    const messageHolderRef = useRef(null);

    useEffect(() => {
        messageHolderRef.current.scrollTop = messageHolderRef.current.scrollHeight;
    }, [modalMessageList])


    return (
        <div className={styles.holder} ref={messageHolderRef}>
            {modalMessageList && modalMessageList.map((message, idx) => (
                <div className={styles.message} key={idx}>
                    <p className={styles["message-text"]}>{message}</p>
                </div>
            ))}
        </div>

    )
}

export default ModalMessageBox;