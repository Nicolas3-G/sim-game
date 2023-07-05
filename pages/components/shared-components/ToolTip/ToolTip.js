import styles from "./ToolTip.module.css";

const ToolTip = ({ text, coords, children }) => {

  console.log()

  return (
    <div className={styles["tool-tip"]}>
      {children}
      {!coords && <span className={styles["tool-tip-text"]}>{text}</span>}

      {coords && <span className={`${styles["tool-tip-text"]} ${styles["location-tool-tip"]}`} style={{left: `${coords[0]}px`, top: `${coords[1]}px`}}>{text}</span>}
    </div>
  );
};

export default ToolTip;