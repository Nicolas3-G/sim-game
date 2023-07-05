import styles from "./FoodModal.module.css"

const FoodModal = ( {gameData, setGameData, setCurrentDayData, handleCloseModal} ) => {
    const foodItems = {
        burger: {
            cost: 5,
            happiness: 5,
            health: 2
        },
        ramen: {
            cost: 2,
            happiness: 2,
            health: 0
        }
    }


    const handleSelectionClick = (e) => {
        
        let selection = e.currentTarget.value;
        let cost = foodItems[selection]["cost"];
        let happiness = foodItems[selection]["happiness"];
        let health = foodItems[selection]["health"];
        let updatedGameData = { ...gameData };
        if (gameData.money >= cost && gameData.energy >= 10) {
            updatedGameData.money -= cost;
            updatedGameData.happiness += happiness;
            updatedGameData.energy -= 5;
            updatedGameData.health += health;
            setGameData(updatedGameData);
            setCurrentDayData({ eaten: true });
        }
    }

    return (
        <div className={styles["food-modal"]}>
            <h2 className={styles["food-modal-title"]}>Food Shop</h2>
            <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg"/></button>
            <div className={styles["selection-window"]}>
            <button onClick={handleSelectionClick} value="ramen" className={styles["selection-option"]}><img src="items/food/ramen.png" />Buy Ramen $2</button>
                <button onClick={handleSelectionClick} value="burger" className={styles["selection-option"]}><img src="items/food/burger.png" />Buy Burger $5</button>
            </div>
        </div>
    )
};

export default FoodModal;