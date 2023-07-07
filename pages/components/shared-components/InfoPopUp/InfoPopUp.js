import { useEffect, useState } from "react";
import styles from "./InfoPopUp.module.css";

const InfoPopUp = ({ item }) => {
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        console.log("Updated hovering: ", hovering)
    }, [hovering])

    const handleInfoHover = () => {
        setHovering(true);
    }

    


    return (
        <div onMouseOver={handleInfoHover} onMouseLeave={() => setHovering(false)} className={styles["info-icon"]}>
            {!hovering && <img src={"icons/three-dot-icon.png"} className={styles["place-holder"]}/>}
            {hovering && <div className={styles["pop-up"]}>
                {item.health != 0 && item.health != null &&
                    <div className={styles["stat-holder"]}>
                        <img className={styles["stat-icon"]} src="icons/heart-icon.png" />
                        <span>{item.health}</span>
                    </div>}
                {item.happiness != 0 && item.happiness != null &&
                    <div className={styles["stat-holder"]}>
                        <img className={styles["stat-icon"]} src="icons/happiness-icon.png" />
                        <span>{item.happiness}</span>
                    </div>}
                {item.energy != 0 && item.energy != null &&
                    <div className={styles["stat-holder"]}>
                        <img className={styles["stat-icon"]} src="icons/energy-icon.png" />
                        <span>{item.energy}</span>
                    </div>}
            </div>}
        </div>
    )
}

export default InfoPopUp;