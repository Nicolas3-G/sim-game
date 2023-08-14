import ToolTip from "@/components/shared-components/ToolTip/ToolTip";
import styles from "./GymModal.module.css";
import { useEffect, useState } from "react";
import ModalMessageBox from "@/components/shared-components/ModalMessageBox/ModalMessageBox";
import classNames from "classnames";

const GymModal = ({ handleEnergyOut, incrementStat, addSystemMessage, gameData, setGameData, handleCloseModal }) => {
    const [messageList, setMessageList] = useState(["Welcome to the Gym! Would you like a tour?"])
    const [membership, setMembership] = useState(false);

    useEffect(() => {
        setMembership(gameData["gym membership"]);
    }, [gameData])


    const addModalMessage = (message) => {
        setMessageList(prev => {
            let updatedArray = [...prev];
            updatedArray.push(message);
            return updatedArray;
        })
    }

    const handleOptionClick = () => {
        setMembership("Day");
    }

    const handleWorkoutClick = () => {
        // if user has more then 6 energy
        if (gameData.endurance > 0) {
            if (gameData.energy >= 6) {
                let updatedGameData = { ...gameData };
                updatedGameData.strength += 1;
                updatedGameData.happiness = incrementStat(5, "happiness");
                updatedGameData.energy += -6;
                updatedGameData.endurance += -1;
                updatedGameData.health = incrementStat(1, "health");
                setGameData(updatedGameData);
            } else {
                handleEnergyOut();
            }
        } else {
            addModalMessage("Your out of endurance! Come back tomorrow");
        } 

    }

    const handleMembershipClick = (e) => {
        let value = e.currentTarget.value;
        if (value == "day") {
            if (gameData.money >= 50) {
                let updatedGameData = { ...gameData };
                updatedGameData.money += -50;
                updatedGameData["gym membership"] = "Day";
                setGameData(updatedGameData);
                addModalMessage("Your all set for the day! Enjoy your workout")
            }
        }
    }


    return <div className={styles.modal}>
        <h2 className={styles["modal-title"]}>Gym</h2>
        <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg" /></button>
        <div className={styles["inner-window"]}>
            <div className={styles["character-section"]}>
                <img className={styles["character-image"]} src="characters/gym-npc.png" />
                <div style={{ maxHeight: "100%", overflow: "hidden" }}>
                    <ModalMessageBox modalMessageList={messageList} />
                </div>
            </div>
            <div className={styles["bottom-job-menu"]}>
                {/* Display Location menu first */}
                {!membership &&
                    <>
                        <h3 style={{ fontSize: "16px", margin: "0", background: "#2b2a33" }}>Membership Options</h3>
                        <div className={styles["option-list"]}>
                            <button onClick={handleMembershipClick} value="day" className={styles["membership-option"]}>Day Pass $50 <p>One Day Access</p></button>
                            <button onClick={handleOptionClick} value="membership" className={styles["membership-option"]}>Membership $200<p>Unlimited Access</p><p>Billed Bi-weekly</p></button>
                        </div>
                    </>
                }


                {/* If player has membership show workout menu*/}
                {membership && <>
                    <div className={styles["jobs-title-holder"]}>
                        <h3 style={{ fontSize: "16px", margin: "0", background: "#2b2a33" }}>Workout Menu</h3>
                        <button className={styles.back}>Cancel Membership</button>
                    </div>
                    <div className={styles["workout-list"]}>
                        <button onClick={handleWorkoutClick} className={styles["workout-option"]}>Workout</button>
                        <button className={styles["workout-option"]}>Cardio Workout</button>
                    </div>
                    <div className={styles["endurance-section"]}><h4>Endurance:</h4>
                        {/* Endurance bars which will be dynamically render based on endurance level */}
                        <div className={classNames(styles["endurance-bar"], gameData.endurance < 1 && styles["drained"])} />
                        <div className={classNames(styles["endurance-bar"], gameData.endurance < 2 && styles["drained"])} />
                    </div>
                </>}
            </div>
        </div>

    </div>
}

export default GymModal;