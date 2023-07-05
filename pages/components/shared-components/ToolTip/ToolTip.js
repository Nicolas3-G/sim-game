import styles from "./ToolTip.module.css";

const ToolTip = ({ text, children }) => {
  return (
    <div className={styles["tool-tip"]}>
      {children}
      <span className={styles["tool-tip-text"]}>{text}</span>
    </div>
  );
};

export default ToolTip;