import ModalMessageBox from "@/components/shared-components/ModalMessageBox/ModalMessageBox";
import styles from "./HospitalModal.module.css"
import { useState } from "react";
import WorkMenu from "@/components/shared-components/WorkMenu/WorkMenu";
import InfoPopUp from "@/components/shared-components/InfoPopUp/InfoPopUp";

const HospitalModal = ({ handleEnergyOut, gameData, setGameData, setCurrentDayData, handleCloseModal }) => {
    const [messageList, setMessageList] = useState(["Hello how can I help you today? Are you hurt?"])


    const addModalMessage = (message) => {
        setMessageList(prev => {
            let updatedArray = [...prev];
            updatedArray.push(message);
            return updatedArray;
        })
    }


    const shopItems = [
        {
            name: "Bandage",
            cost: 60,
            health: 5,
            img: "items/medical/bandage.png"
        },
        {
            name: "Urgent Care",
            cost: 150,
            health: 15,
            energy: 0,
            img: "items/medical/needle.png"
        },

    ]


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
                    <img className={styles["character-image"]} src="characters/hospital-npc.png" />
                    <div style={{ maxHeight: "100%", overflow: "hidden" }}>
                        <ModalMessageBox modalMessageList={messageList} />
                    </div>
                </div>
                <div className={styles["selection-window"]}>
                    {shopItems.map((item, idx) => (
                        <button onClick={handleSelectionClick} key={idx} value={item.name} itemindex={idx} className={styles["selection-option"]}>
                            <img src={item.img} />
                            Buy {item.name} ${item.cost}
                            <div className={styles["info-pop-up"]}>
                                <InfoPopUp item={item} />
                            </div>

                        </button>
                    ))}
                </div>
                {/* Checks if player has job, then if the job is at this location */}
                {gameData.job && gameData.job.location == gameData.location && <WorkMenu handleEnergyOut={handleEnergyOut} gameData={gameData} setGameData={setGameData} addModalMessage={addModalMessage} />}
            </div>

        </div>
    )
};

export default HospitalModal;