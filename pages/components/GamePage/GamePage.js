import { useEffect, useState } from 'react';
import styles from './GamePage.module.css';
import LocationHolder from './LocationHolder/LocationHolder';
import classNames from 'classnames';
import ToolTip from '../shared-components/ToolTip/ToolTip';
import MessageFeed from './MessageFeed/MessageFeed';

const GamePage = ({ gameDataObject, resetGameData }) => {
    const [gameData, setGameData] = useState(gameDataObject.current);
    const [dropRewardCrate, setDropRewardCrate] = useState(false);
    const [prevGameData, setPrevGameData] = useState(gameDataObject.current);
    const [systemMessageList, setSystemMessageList] = useState(["Hey heard you were back in town!", "Remember rent is due each week! You'll need $400", "If you need a job, ask around town"])

    const addSystemMessage = (messageText) => {
        setSystemMessageList((prev) => {
            let prevList = [...prev];
            prevList.push(messageText);
            return prevList;
        })
    }

    const rewardCrateTimer = () => {
        const randomNum = Math.random();
        const chancePreDay = .5;
        let crateTimer;

        // clear timer if there is one
        crateTimer ? clearTimeout(crateTimer) : null;


        if (randomNum < chancePreDay) {
            console.log("Reward granted, 30 seconds")
            crateTimer = setTimeout(() => {
                setDropRewardCrate(true);
            }, 5000)
        }
    }

    const [animationObject, setAnimationObject] = useState({
        health: "",
        happiness: "",
        money: "",
        energy: ""
    })
    const [currentDayData, setCurrentDayData] = useState({
        eaten: false,
    });

    useEffect(() => {
        console.log("Updated Current Day Data: ", currentDayData);
    }, [currentDayData]);

    useEffect(() => {
        let animationTimer;
        clearTimeout(animationTimer);
        console.log("Updated GameData: ", gameData, "Prev GameData:", prevGameData);
        const stats = ["health", "happiness", "money", "energy", "day"];

        for (let stat of stats) {
            if (gameData[stat] < prevGameData[stat]) {
                setAnimationObject((prevAnimationObject) => {
                    let newObject = { ...prevAnimationObject };
                    newObject[stat] = "down";
                    return newObject;
                })
            } else if (gameData[stat] > prevGameData[stat]) {
                setAnimationObject((prevAnimationObject) => {
                    let newObject = { ...prevAnimationObject };
                    newObject[stat] = "up";
                    return newObject;
                })
            }
        }
        //Resets animation object after 1 second
        animationTimer = setTimeout(() => {
            setAnimationObject({
                health: "",
                happiness: "",
                money: "",
                energy: "",
                day: ""
            })
        }, 1000);
        setTimeout(() => { setPrevGameData(gameData) }, 1200);

    }, [gameData]);

    const StatusBar = () => {
        return (
            <div className={styles["status-bar"]}>
                <div>
                    <ToolTip text="Health">
                        <div className={styles["status-item-holder"]}>
                            <p style={{ background: "rgb(243, 94, 94)" }} className={classNames(styles["status-bar-item"], styles[animationObject.health])}><img className={styles["status-bar-image"]} src="icons/heart-icon.png" /><span className={styles["status-bar-value"]}>{gameData.health}</span></p>
                            <p className={classNames(styles["status-animation"], styles[animationObject.health])}>{animationObject.health == "up" ? "+" : null}{gameData.health - prevGameData.health}</p>
                        </div>
                    </ToolTip>
                    <div className={styles["status-info-box"]}>
                        <p className={classNames(styles["status-bar-item"], styles[animationObject.day])}>Day: {gameData.day}</p>
                        <p className={styles["status-bar-item"]}>Job: {gameData.job && gameData.job.name}</p>
                        <p className={classNames(styles["status-bar-item"], !currentDayData.eaten && styles["hungry"])}>Hunger: {currentDayData.eaten ? "Full" : "Hungry"}</p>
                    </div>


                </div>
                <ToolTip text="Happiness">
                    <div className={styles["status-item-holder"]}>
                        <p style={{ background: "rgb(243, 243, 94)" }} className={styles["status-bar-item"]}><img className={styles["status-bar-image"]} src="icons/happiness-icon.png" /> <span className={styles["status-bar-value"]}>{gameData.happiness}</span></p>
                        <p className={classNames(styles["status-animation"], styles[animationObject.happiness])}>{animationObject.happiness == "up" ? "+" : null}{gameData.happiness - prevGameData.happiness}</p>
                    </div>
                </ToolTip>
                <ToolTip text="Money">
                    <div className={styles["status-item-holder"]}>
                        <p style={{ background: "rgb(71, 159, 71)" }} className={styles["status-bar-item"]}><img className={styles["status-bar-image"]} src="icons/money-icon.png" /> <span className={styles["status-bar-value"]}>${gameData.money}</span></p>
                        <p className={classNames(styles["status-animation"], styles[animationObject.money])}>{animationObject.money == "up" ? "+" : null}{gameData.money - prevGameData.money}</p>
                    </div>
                </ToolTip>
                <ToolTip text="Energy">
                    <div className={styles["status-item-holder"]}>
                        <p style={{ background: "rgb(83, 232, 255)" }} className={styles["status-bar-item"]}><img className={styles["status-bar-image"]} src="icons/energy-icon.png" />  <span className={styles["status-bar-value"]}>{gameData.energy}</span></p>
                        <p className={classNames(styles["status-animation"], styles[animationObject.energy])}>{animationObject.energy == "up" ? "+" : null}{gameData.energy - prevGameData.energy}</p>
                    </div>
                </ToolTip>
            </div>
        );
    }



    const handleNextDayClick = (bundledUpdateData) => {

        let updatedGameData = { ...gameData };
        if (bundledUpdateData) {
            updatedGameData = bundledUpdateData;
        }
        updatedGameData.day++;
        // Resets energy to 100 each day
        updatedGameData.energy = 100;
        updatedGameData.location = "Home";

        // Removes rent every 7 days
        if (updatedGameData.day % 7 == 0) {
            updatedGameData.money -= 400;
            addSystemMessage("You paid rent! $400 deducted.")
        }

        if (updatedGameData.happiness <= 20) {
            addSystemMessage("Your Happiness is low, you wake feeling ill and tired 😢")
            updatedGameData.energy -= 20;
            updatedGameData.health -= 2;
        }

        if (!currentDayData.eaten) {
            addSystemMessage("You forgot to eat yesterday, you lost 10 health. 5 happiness! \u{1F44E}",)
            updatedGameData.health -= 10;
            updatedGameData.happiness -= 5;
            if (updatedGameData.health <= 0) {
                updatedGameData.died = true;
            }
        } else {
            setCurrentDayData({ eaten: false });
        }

        // Warns that rent is due tomorrow
        if (updatedGameData.day % 6 == 0) {
            addSystemMessage("Rent is due tomorrow! Make sure you can pay!")
        }

        setGameData(updatedGameData);
        // Starts timer for reward crate
        rewardCrateTimer();
        console.log(gameData);
    }

    return (
        <div className={styles["game-holder"]}>
            <StatusBar />
            <MessageFeed systemMessageList={systemMessageList} />
            <div className={styles.map} />
            {!gameData.died && <button className={styles["next-day-button"]} onClick={() => handleNextDayClick()}>Next Day</button>}
            <LocationHolder dropRewardCrate={dropRewardCrate} setDropRewardCrate={setDropRewardCrate} addSystemMessage={addSystemMessage} setCurrentDayData={setCurrentDayData} gameData={gameData} setGameData={setGameData} handleNextDayClick={handleNextDayClick} />
            {gameData.died &&
                <div className={styles["game-over-holder"]}>
                    <h1>You Died!</h1>
                    <p>Days Survived: {gameData.day}</p>
                    <button onClick={resetGameData}>Restart</button>
                </div>}
        </div>
    );
}

export default GamePage;