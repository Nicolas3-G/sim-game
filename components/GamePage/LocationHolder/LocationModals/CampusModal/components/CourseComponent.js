import styles from "./CourseComponent.module.css";
import classNames from "classnames";

const CourseComponent = ({ handleEnergyOut, courseName, endEducation, gameData, setGameData, baseEducation }) => {
    let maxBubbleCount = endEducation;

    const completed = gameData.education >= maxBubbleCount;



    const renderBubble = () => {
        let bubbleCount = endEducation - baseEducation;
        let bubbles = [];
        for (let i = 0; i < bubbleCount; i++) {
            bubbles.push(<div key={i} className={classNames(styles["education-bubble"], gameData.education > (i + baseEducation) && styles.filled)} />);
        }
        return bubbles;
    }

    const handleStudyClick = () => {
        // Checks that user has minimum amount of education, and does not have more then max for course
        if (baseEducation <= gameData.education && gameData.education < maxBubbleCount) {
            if (gameData.energy >= 12) {
                let updatedGameData = { ...gameData };
                updatedGameData.education += 1;
                updatedGameData.energy -= 12;
                setGameData(updatedGameData);
            } else {
                handleEnergyOut();
            }

        }
    }

    return (
        <div className={styles.holder}>
            <div className={styles["course-title-holder"]}>
                <h4 className={styles["course-title"]}>{courseName}</h4>
                {completed && <p style={{ color: "green" }}>Completed</p>}
            </div>

            {!completed &&
                <>
                    <div className={styles["education-bubble-holder"]}>
                        {renderBubble()}
                    </div>
                    <button onClick={handleStudyClick}>Study</button>
                </>
            }



        </div>
    )
}

export default CourseComponent;