import ModalMessageBox from "@/pages/components/shared-components/ModalMessageBox/ModalMessageBox";
import styles from "./MallModal.module.css"
import { useState } from "react";
import WorkMenu from "@/pages/components/shared-components/WorkMenu/WorkMenu";

const MallModal = ({ handleWorkEnergyOut, gameData, setGameData, setCurrentDayData, handleCloseModal }) => {
    const [messageList, setMessageList] = useState(["Welcome to the mall! Please behave yourself!"])
    

    const addModalMessage = (message) => {
        setMessageList(prev => {
            let updatedArray = [ ...prev ];
            updatedArray.push(message);
            return updatedArray;
        })
    }

    const mallItems = [
        {
            name: "Interview Clothes",
            cost: 120,
            happiness: 5,
            health: 2,
            img: "items/mall/interview-clothes.png",
        },
        {
            name: "Nice Clothes",
            cost: 320,
            happiness: 2,
            health: 0,
            img: "items/mall/nice-clothes.png",
        }
    ]


    const handleSelectionClick = (e) => {
        let selection = e.currentTarget.getAttribute("itemindex");
        let cost = mallItems[selection]["cost"];
        let happiness = mallItems[selection]["happiness"];
        let health = mallItems[selection]["health"];
        let updatedGameData = { ...gameData };
        if (gameData.money >= cost) {
            addModalMessage("Great choice! Can I get you anything else?")
            updatedGameData.money -= cost;
            updatedGameData.inventory.push(mallItems[selection].name);
            setGameData(updatedGameData);
            setCurrentDayData({ eaten: true });
        }
    }

    return (
        <div className={styles["modal"]}>
            <h2 className={styles["modal-title"]}>Mall</h2>
            <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg" /></button>
            <div className={styles["inner-window"]}>
                <div className={styles["character-section"]}>
                    <img className={styles["character-image"]} src="characters/mall-npc.png" />
                    <div style={{maxHeight: "100%", overflow: "hidden"}}>
                        <ModalMessageBox modalMessageList={messageList} />
                    </div>
                </div>
                <div className={styles["selection-window"]}>
            
                    {mallItems.map((item, idx) => (
                         <button onClick={handleSelectionClick} key={idx} value={item.name} itemindex={idx} className={styles["selection-option"]}><img src={item.img} />Buy {item.name} ${item.cost}</button>
                    ))}
                </div>
                {/* Checks if player has job, then if the job is at this location */}
                {gameData.job && gameData.job.location == gameData.location && <WorkMenu handleWorkEnergyOut={handleWorkEnergyOut} gameData={gameData} setGameData={setGameData} addModalMessage={addModalMessage} /> }
            </div>

        </div>
    )
};

export default MallModal;