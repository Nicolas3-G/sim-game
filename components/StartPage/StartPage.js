import styles from './StartPage.module.css';

const StartPage = ({ setGameStarted }) => {

    return (
        <div className={styles.page}>
            <div className={styles.holder}>
                <h1 style={{margin: "0px"}}>Welcome</h1>
                <button onClick={() => setGameStarted(true)} className={styles["start-button"]}>Start</button>
            </div>
        </div>

    );
};

export default StartPage;
