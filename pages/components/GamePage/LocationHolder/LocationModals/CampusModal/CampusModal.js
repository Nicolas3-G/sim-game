import ModalMessageBox from "@/pages/components/shared-components/ModalMessageBox/ModalMessageBox";
import styles from "./CampusModal.module.css"
import { useState } from "react";
import WorkMenu from "@/pages/components/shared-components/WorkMenu/WorkMenu";
import CourseComponent from "./components/CourseComponent/CourseComponent";

const CampusModal = ({ handleWorkEnergyOut, gameData, setGameData, setCurrentDayData, handleCloseModal }) => {
    const [messageList, setMessageList] = useState(["Hi! Welcome to the campus, need help finding anything?"])


    const addModalMessage = (message) => {
        setMessageList(prev => {
            let updatedArray = [...prev];
            updatedArray.push(message);
            return updatedArray;
        })
    }



    return (
        <div className={styles["modal"]}>
            <h2 className={styles["modal-title"]}>Campus</h2>
            <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg" /></button>
            <div className={styles["inner-window"]}>
                <div className={styles["character-section"]}>
                    <img className={styles["character-image"]} src="characters/campus-npc.png" />
                    <div style={{ maxHeight: "100%", overflow: "hidden" }}>
                        <ModalMessageBox modalMessageList={messageList} />
                    </div>
                </div>
                <div className={styles["study-window"]}>
                    <div className={styles["base-education-holder"]}>
                        <h3 style={{fontSize: "18px", margin: "0"}}>Base Education</h3>
                        {/* Each course component takes a baseEducation, where it starts counting to detemine which bubbles are filled,
                        it should be set to what the users final education would be after the previous course is completed */}
                        <CourseComponent courseName="Grade School" baseEducation={0} endEducation={10} gameData={gameData} setGameData={setGameData} />
                        <CourseComponent courseName="Junior High" baseEducation={10} endEducation={25} gameData={gameData} setGameData={setGameData}/>
                        <CourseComponent courseName="High School" baseEducation={25} endEducation={50} gameData={gameData} setGameData={setGameData} />
                    </div>
                </div>
                {/* Checks if player has job, then if the job is at this location */}
                {gameData.job && gameData.job.location == gameData.location && <WorkMenu handleWorkEnergyOut={handleWorkEnergyOut} gameData={gameData} setGameData={setGameData} addModalMessage={addModalMessage} />}
            </div>

        </div>
    )
};

export default CampusModal;