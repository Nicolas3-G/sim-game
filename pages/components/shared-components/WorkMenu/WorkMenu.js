import styles from "./WorkMenu.module.css"

const WorkMenu = ({ gameData, setGameData, addModalMessage, handleWorkEnergyOut }) => {

    const handleWorkClick = () => {
        console.log("Work click...", gameData.job.name);
        let updatedGameData = { ...gameData };
        if (gameData.energy >= Math.abs(gameData.job.energy)) {
            updatedGameData.money += gameData.job.money;
            // Add these following values because they are already negative
            updatedGameData.happiness += gameData.job.happiness;
            updatedGameData.energy += gameData.job.energy;
            updatedGameData.experience += 1;
            setGameData(updatedGameData);
            addModalMessage("Great work!");
        } else {
            handleWorkEnergyOut();
        }
    }

    return (
        <div className={styles.holder}>
            <h3 className={styles.title}>Work Menu</h3>
            <div className={styles["inner-holder"]}>
                <div className={styles["work-menu-text-holder"]}>
                    <p>Position: {gameData.job.name}</p>
                    <p>Experience: {gameData.experience}</p>
                </div>

                <button className={styles["work-button"]} onClick={handleWorkClick}>Work</button>
                <div className={styles["stat-holder"]}>
                    <img className={styles.icon} src="icons/money-icon.png" />
                    <p>{gameData.job.money}</p>
                </div>
                <div className={styles["stat-holder"]}>
                    <img className={styles.icon} src="icons/energy-icon.png" />
                    <p>{gameData.job.energy}</p>
                </div>
                <div className={styles["stat-holder"]}>
                    <img className={styles.icon} src="icons/happiness-icon.png" />
                    <p>{gameData.job.happiness}</p>
                </div>

            </div>

        </div>
    )
}

export default WorkMenu;