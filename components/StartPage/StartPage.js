import styles from './StartPage.module.css';

const StartPage = ({ setGameStarted }) => {

    const MenuButton = ({ buttonAction, title, style }) => {
        return (
            <div onClick={buttonAction} className={`${styles.pushable} ${styles[style]}`}>
                <span className={`${styles.front} ${styles[style]}`}>{title}</span>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.holder}>
                <div className={styles["title-holder"]}>
                    {/* <h1 className={styles.title}>Applicant.io</h1> */}
                    <img src="metal-header-2.png" className={styles["metal-header-2"]}/>
                    <p className={styles.infotwo}>(Playable Alpha Verison)</p>
                </div>

                <div className={styles["button-holder"]}>
                    <MenuButton title="Start" buttonAction={() => setGameStarted(true)} />
                    <MenuButton style={"yellow"} title="Settings" buttonAction={() => setGameStarted(true)} />
                </div>

            </div>
            <p className={styles.verison}>Verison: Alpha 0.01</p>
        </div>

    );
};

export default StartPage;
