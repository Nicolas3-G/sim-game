import styles from "./TravelModal.module.css";

const TravelModal = ({ desiredLocation, setNewLocation, handleCloseModal }) => {
    const handleTravelClick = () => {
        setNewLocation(desiredLocation);
    }

    return (
        <div className={styles.modal}>
            <h1>Travel Page</h1>
            <p>Would you like to travel to <span style={{color: "yellow", fontWeight: "bold"}}>{desiredLocation}</span> for<br /> <span style={{color: "red", fontWeight: "bold"}}>-5 Energy</span>?</p>
            <button className={styles["cancel-button"]} onClick={handleCloseModal}>Cancel</button>
            <button className={styles["travel-button"]} onClick={handleTravelClick}>Travel</button>
        </div>
    )
}

export default TravelModal;