import { useEffect, useRef, useState } from 'react';
import StartPage from '../StartPage/StartPage';
import styles from './GameWindow.module.css';
import GamePage from '../GamePage/GamePage';

const GameWindow = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const gameDataObject = useRef();

    useEffect(() => {
        if (gameStarted) {
            initializeGameDataObject();
            setTimeout(() => {
                setLoading(false);
            }, 1000)
            console.log("Initalized Game Data Object: ", gameDataObject.current);
        }

    }, [gameStarted])

    const initializeGameDataObject = () => {
        gameDataObject.current = {
            player: "Yon",
            location: "Home",
            health: 100,
            happiness: 50,
            education: 0,
            strength: 0,
            endurance: 2,
            inventory: [],
            experience: 0,
            money: 50,
            energy: 100,
            day: 1,
            job: null,
            died: false,
            "gym membership": false,
        }
    }

    const resetGameData = () => {
        initializeGameDataObject();
        setGameStarted(false);
        setLoading(true);
    }


    return <div className={styles.window}>
        {!gameStarted && <StartPage setGameStarted={setGameStarted} gameDataObject />}
        {loading &&
            <div className={styles.loading}>
                <h1>Loading</h1>
            </div>}
        {gameStarted && !loading && <GamePage gameDataObject={gameDataObject} resetGameData={resetGameData} />}
    </div>
}

export default GameWindow;