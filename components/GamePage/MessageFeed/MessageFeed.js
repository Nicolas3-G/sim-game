import { useEffect, useRef } from "react";
import styles from "./MessageFeed.module.css";

const MessageFeed = ({ systemMessageList }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the modal element
        modalRef.current.scrollTop = modalRef.current.scrollHeight;
    }, [systemMessageList]);

    return (
        <div className={styles.modal}>
            <div className={styles["inner-window"]} ref={modalRef}>
                {systemMessageList && systemMessageList.map((message, idx) => (
                    <div className={styles.message} key={idx}>
                        <p className={styles["message-text"]}>{message}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default MessageFeed;