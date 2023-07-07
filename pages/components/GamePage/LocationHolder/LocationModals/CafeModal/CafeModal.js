import ModalMessageBox from "@/pages/components/shared-components/ModalMessageBox/ModalMessageBox";
import styles from "./CafeModal.module.css"
import { useState } from "react";
import WorkMenu from "@/pages/components/shared-components/WorkMenu/WorkMenu";
import InfoPopUp from "@/pages/components/shared-components/InfoPopUp/InfoPopUp";

const CafeModal = ({ handleEnergyOut, gameData, setGameData, setCurrentDayData, handleCloseModal }) => {
    const [messageList, setMessageList] = useState(["Welcome to my shop"])


    const addModalMessage = (message) => {
        setMessageList(prev => {
            let updatedArray = [...prev];
            updatedArray.push(message);
            return updatedArray;
        })
    }

    const foodItems = [
        {
            name: "Coffee",
            cost: 20,
            happiness: 1,
            health: -2,
            energy: 1,
            img: "items/food/coffee.png",
        },
        {
            name: "Espresso",
            cost: 50,
            happiness: 1,
            health: -10,
            energy: 5,
            img: "items/food/espresso.png"
        },
        {
            name: "Egg Sandwich",
            cost: 15,
            happiness: 3,
            health: -2,
            energy: 0,
            img: "items/food/breakfast-sandwich.png"
        },
        {
            name: "Salad",
            cost: 20,
            happiness: -3,
            health: +4,
            energy: 0,
            img: "items/food/salad.png"
        },

    ]




    const handleSelectionClick = (e) => {
        let selection = e.currentTarget.getAttribute("itemindex");
        let cost = foodItems[selection]["cost"];
        let happiness = foodItems[selection]["happiness"];
        let health = foodItems[selection]["health"];
        let energy = foodItems[selection]["energy"];
        let updatedGameData = { ...gameData };
        if (gameData.money >= cost) {
            addModalMessage("Great choice! Can I get you anything else?")
            updatedGameData.money -= cost;
            updatedGameData.happiness += happiness;
            updatedGameData.energy += energy;

            // Here we check that the new health value is not over 100, is it is we set it to 100;
            let newHealthValue = updatedGameData.health + health;
            newHealthValue <= 100 ? null : newHealthValue = 100;
            updatedGameData.health = newHealthValue;
            setGameData(updatedGameData);
            setCurrentDayData({ eaten: true });
        }
    }

    return (
        <div className={styles["food-modal"]}>
            <h2 className={styles["food-modal-title"]}>Cafe</h2>
            <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg" /></button>
            <div className={styles["inner-window"]}>
                <div className={styles["character-section"]}>
                    <img className={styles["character-image"]} src="characters/cafe-npc.png" />
                    <div style={{ maxHeight: "100%", overflow: "hidden" }}>
                        <ModalMessageBox modalMessageList={messageList} />
                    </div>
                </div>
                <div className={styles["selection-window"]}>

                    {foodItems.map((item, idx) => (
                        <button onClick={handleSelectionClick} key={idx} value={item.name} itemindex={idx} className={styles["selection-option"]}>
                            <img src={item.img} />Buy {item.name} ${item.cost}
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

export default CafeModal;