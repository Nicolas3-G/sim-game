import styles from "./HomeModal.module.css";

const HomeModal = ({ handleCloseModal, handleNextDayClick }) => {
    return (
        <div className={styles.modal}>
            <h1 style={{margin: "5px 0"}}>Home</h1>
            <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg"/></button>
            <img className={styles.image} src="bedroom.png" />
            <button className={styles["sleep-button"]} onClick={() => handleNextDayClick()}>Next Day (sleep)</button>
        </div>
    )
}

export default HomeModal;