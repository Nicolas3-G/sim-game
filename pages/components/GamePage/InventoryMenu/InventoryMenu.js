import { useEffect, useState } from "react";
import styles from "./InventoryMenu.module.css";

const InventoryMenu = () => {
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        console.log("Updated hovering: ", hovering)
    }, [hovering])

    const handleHoverIcon = () => {
        console.log("Hovered")
        setHovering(true);
    }

    return (
        <div onMouseOver={handleHoverIcon} onMouseLeave={() => setHovering(false)} className={styles["inventory-holder"]}>
            <img className={styles["inventory-icon"]} src="items/food/burger.png" />
            <div className={styles["inventory-inner-menu"]}>
                Item
            </div>
        </div>
    )
}

export default InventoryMenu;