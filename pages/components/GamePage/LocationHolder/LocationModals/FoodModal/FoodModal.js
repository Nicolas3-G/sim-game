import InfoPopUp from "@/pages/components/shared-components/InfoPopUp/InfoPopUp";
import styles from "./FoodModal.module.css"

const FoodModal = ({ gameData, setGameData, setCurrentDayData, handleCloseModal }) => {

    const foodItems = [
        {
            name: "Ramen",
            cost: 15,
            happiness: 3,
            health: -2,
            energy: 0,
            img: "items/food/ramen.png"
        },
        {
            name: "Burger",
            cost: 40,
            happiness: 5,
            health: -3,
            energy: 0,
            img: "items/food/burger.png"
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
            <h2 className={styles["food-modal-title"]}>Food Shop</h2>
            <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg" /></button>
            <div className={styles["selection-window"]}>
                {foodItems.map((item, idx) => (
                    <button onClick={handleSelectionClick} key={idx} value={item.name} itemindex={idx} className={styles["selection-option"]}>
                        <img src={item.img} />
                        Buy {item.name} ${item.cost}
                        <div className={styles["info-pop-up"]}>
                            <InfoPopUp item={item} />
                        </div>

                    </button>
                ))}
            </div>
        </div>
    )
};

export default FoodModal;