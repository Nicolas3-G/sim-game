import ModalMessageBox from "@/pages/components/shared-components/ModalMessageBox/ModalMessageBox";
import styles from "./HospitalModal.module.css"
import { useState } from "react";
import WorkMenu from "@/pages/components/shared-components/WorkMenu/WorkMenu";

const HospitalModal = ({ handleWorkEnergyOut, gameData, setGameData, setCurrentDayData, handleCloseModal }) => {
    const [messageList, setMessageList] = useState(["Hello how can I help you today? Are you hurt?"])
    

    const addModalMessage = (message) => {
        setMessageList(prev => {
            let updatedArray = [ ...prev ];
            updatedArray.push(message);
            return updatedArray;
        })
    }

    const shopItems = {
        bandage: {
            cost: 60,
            happiness: 0,
            health: 5,
        },
        urgentCare: {
            cost: 150,
            happiness: 0,
            health: 15,
        }
    }


    const handleSelectionClick = (e) => {
        let selection = e.currentTarget.value;
        let cost = shopItems[selection]["cost"];
        let happiness = shopItems[selection]["happiness"];
        let health = shopItems[selection]["health"];
        let updatedGameData = { ...gameData };
        if (gameData.money >= cost) {
            addModalMessage("Sure thing! Do you need anything else?")
            updatedGameData.money -= cost;
            updatedGameData.happiness += happiness;
            updatedGameData.health += health;
            setGameData(updatedGameData);
            setCurrentDayData({ eaten: true });
        }
    }

    return (
        <div className={styles["modal"]}>
            <h2 className={styles["modal-title"]}>Hospital</h2>
            <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg" /></button>
            <div className={styles["inner-window"]}>
                <div className={styles["character-section"]}>
                    <img className={styles["character-image"]} src="characters/mall-npc.png" />
                    <div style={{maxHeight: "100%", overflow: "hidden"}}>
                        <ModalMessageBox modalMessageList={messageList} />
                    </div>
                </div>
                <div className={styles["selection-window"]}>
                    <button onClick={handleSelectionClick} value="bandage" className={styles["selection-option"]}><img src="items/food/ramen.png" />Buy Bandage $60</button>
                    <button onClick={handleSelectionClick} value="urgentCare" className={styles["selection-option"]}><img src="items/food/burger.png" />Visit Urgent Care $150</button>
                </div>
                {/* Checks if player has job, then if the job is at this location */}
                {gameData.job && gameData.job.location == gameData.location && <WorkMenu handleWorkEnergyOut={handleWorkEnergyOut} gameData={gameData} setGameData={setGameData} addModalMessage={addModalMessage} /> }
            </div>

        </div>
    )
};

export default HospitalModal;