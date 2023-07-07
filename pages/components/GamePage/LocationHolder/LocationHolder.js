import styles from './LocationHolder.module.css';
import { useEffect, useState } from 'react';
import JobModal from './LocationModals/JobModal/JobModal';
import classNames from 'classnames';
import TravelModal from './LocationModals/TravelModal/TravelModal';
import FoodModal from './LocationModals/FoodModal/FoodModal';
import HomeModal from './LocationModals/HomeModal/HomeModal';
import CafeModal from './LocationModals/CafeModal/CafeModal';
import MallModal from './LocationModals/MallModal/MallModal';
import HospitalModal from './LocationModals/HospitalModal/HospitalModal';
import CampusModal from './LocationModals/CampusModal/CampusModal';
import ToolTip from '../../shared-components/ToolTip/ToolTip';
import GymModal from './LocationModals/GymModal/GymModal';
import GasStationModal from './LocationModals/GasStationModal/GasStationModal';

const LocationHolder = ({ dropRewardCrate, setDropRewardCrate, addSystemMessage, gameData, setGameData, setCurrentDayData, handleNextDayClick }) => {
    const [currentModal, setCurrentModal] = useState();
    const [desiredLocation, setDesiredLocation] = useState();
    const [distanceCost, setDistanceCost] = useState(0);
    const [rewardDropping, setRewardDropping] = useState(true);
    const [randomPos, setRandomPos] = useState([Math.floor(Math.random() * 350) + 100, Math.floor(Math.random() * 350) + 50]);

    const locationCoords = {
        "Home": [230, 410],
        "Staffing Agency": [200, 120],
        "Food": [250, 200],
        "Mall": [540, 140],
        "Hospital": [540, 250],
        "Gas Station": [410, 60],
        "Cafe": [150, 180],
        "Campus": [450, 70],
        "Gym": [240, 260],
    }

    const incrementStat = (increment, statName) => {
        if (statName == "health" || statName == "happiness") {
            if ((gameData[statName] + increment) > 100) {
                return 100;
            } else {
                return gameData[statName] + increment;
            }
        }
        if (statName == "energy") {
            if ((gameData[statName] + increment) > 100) {
                return 100;
            } else if ((gameData[statName] + increment) <= 0) {
                return handleEnergyOut();
            } else {
                return gameData[statName] + increment;
            }
        }
    }

    const handleEnergyOut = () => {
        setCurrentModal("energyOut");
        handleNextDayClick();
    }

    useEffect(() => { console.log("reward dropping updated: ", rewardDropping) }, [rewardDropping])

    const EnergyOutModal = () => {
        return (
            <div className={styles.modal}>
                <h1>Energy Out!</h1>
                <p style={{ width: "80%", margin: "20px auto" }}>You ran out of energy. You headed home to sleep for the night and wake up the next morning.</p>
                <button onClick={handleCloseModal}>Continue</button>
            </div>
        )
    }


    const handleLocationClick = (e) => {
        console.log("Location Click: ", e.target.value)
        setDesiredLocation(e.currentTarget.value);
        // Finds distance from current location to desired location
        const distance = Math.sqrt(Math.pow(locationCoords[e.currentTarget.value][0] - locationCoords[gameData.location][0], 2) + Math.pow(locationCoords[e.currentTarget.value][1] - locationCoords[gameData.location][1], 2));
        // Finds energy cost using that distance
        const energyCost = Math.floor(distance / 30);
        setDistanceCost(energyCost);
        if (e.currentTarget.value != gameData.location) {
            setNewLocation(e.currentTarget.value, energyCost)
        } else {
            setCurrentModal(e.currentTarget.value)
        }
    }

    const setNewLocation = (location, cost) => {
        if (gameData.energy >= cost) {
            let updatedGameData = { ...gameData };
            updatedGameData.energy -= cost;
            updatedGameData.location = location;
            setGameData(updatedGameData);
            handleCloseModal();
            setCurrentModal(location);
        } else {
            console.log("Not Enough Energy!")
            let updatedGameData = { ...gameData };
            updatedGameData.location = "Home";
            setCurrentModal("energyOut");
            handleNextDayClick(updatedGameData);
        }

    }

    const handleCloseModal = () => {
        setCurrentModal();
    }

    const handleRewardClicked = () => {
        console.log("Reward Clicked!");

        // Handles animation and position
        setRewardDropping(true);
        setDropRewardCrate(false);
        setRandomPos([Math.floor(Math.random() * 350) + 100, Math.floor(Math.random() * 350) + 50]);

        // Handles adding reward to player money
        let updatedGameData = { ...gameData };
        updatedGameData.money += Math.floor(Math.random() * 100 + 50);
        setGameData(updatedGameData);
    }

    const RewardCrate = () => {

        useEffect(() => {
            setTimeout(() => setRewardDropping(false), 2100);
        })

        return (
            <div style={{ "--random-position-x": `${randomPos[0]}px`, "--random-position-y": `${randomPos[1]}px` }} onClick={() => handleRewardClicked()} className={classNames(styles["reward-crate"], rewardDropping ? styles["dropping"] : styles["not"])}><img src="crate.png" /></div>
        )
    }



    return (
        <div className={styles["location-holder"]}>
            <div className={styles.player} style={{ left: `${locationCoords[gameData.location][0]}px`, top: `${locationCoords[gameData.location][1]}px` }}><img src="character.png" /></div>
            {/* Location Buttons */}
            <ToolTip text="Food" coords={[305, 250]}>
                <button onClick={handleLocationClick} value="Food" className={classNames(styles["location-button"], styles["food"])}><img className={styles["location-icon"]} src="items/food/burger.png" /></button>
            </ToolTip>
            <ToolTip text="Staffing Agency" coords={[255, 170]}>
                <button onClick={handleLocationClick} value="Staffing Agency" className={classNames(styles["location-button"], styles["staffing-agency"])}><img className={styles["location-icon"]} src="icons/locations/staffing-agency.png" /></button>
            </ToolTip>
            <ToolTip text="Home" coords={[285, 450]}>
                <button onClick={handleLocationClick} value="Home" className={classNames(styles["location-button"], styles["home"])}><img className={styles["location-icon"]} src="icons/locations/home.png" /></button>
            </ToolTip>
            <ToolTip text="Mall" coords={[585, 170]}>
                <button onClick={handleLocationClick} value="Mall" className={classNames(styles["location-button"], styles["mall"])}><img className={styles["location-icon"]} src="icons/locations/mall.png" /></button>
            </ToolTip>
            <ToolTip text="Campus" coords={[495, 100]}>
                <button onClick={handleLocationClick} value="Campus" className={classNames(styles["location-button"], styles["campus"])}><img className={styles["location-icon"]} src="icons/locations/campus.png" /></button>
            </ToolTip>
            <ToolTip text="Gym" coords={[225, 310]}>
                <button onClick={handleLocationClick} value="Gym" className={classNames(styles["location-button"], styles["gym"])}><img className={styles["location-icon"]} src="icons/locations/gym.png" /></button>
            </ToolTip>
            <ToolTip text="Hospital" coords={[595, 290]}>
                <button onClick={handleLocationClick} value="Hospital" className={classNames(styles["location-button"], styles["hospital"])}><img className={styles["location-icon"]} src="icons/locations/hospital.png" /></button>
            </ToolTip>
            <ToolTip text="Gas Station" coords={[412, 80]}>
                <button onClick={handleLocationClick} value="Gas Station" className={classNames(styles["location-button"], styles["gas-station"])}><img className={styles["location-icon"]} src="icons/locations/gas-station.png" /></button>
            </ToolTip>
            <ToolTip text="Cafe" coords={[185, 210]}>
                <button onClick={handleLocationClick} value="Cafe" className={classNames(styles["location-button"], styles["cafe"])}><img className={styles["location-icon"]} src="items/food/coffee.png" /></button>
            </ToolTip>
            {/* Modals */}
            {currentModal == "Food" && <FoodModal gameData={gameData} setGameData={setGameData} setCurrentDayData={setCurrentDayData} handleCloseModal={handleCloseModal} />}
            {currentModal == "Cafe" && <CafeModal handleEnergyOut={handleEnergyOut} gameData={gameData} setGameData={setGameData} setCurrentDayData={setCurrentDayData} handleCloseModal={handleCloseModal} />}
            {currentModal == "Gas Station" && <GasStationModal handleEnergyOut={handleEnergyOut} gameData={gameData} setGameData={setGameData} setCurrentDayData={setCurrentDayData} handleCloseModal={handleCloseModal} />}
            {currentModal == "Mall" && <MallModal handleEnergyOut={handleEnergyOut} gameData={gameData} setGameData={setGameData} setCurrentDayData={setCurrentDayData} handleCloseModal={handleCloseModal} />}
            {currentModal == "Hospital" && <HospitalModal handleWorkEnergyOut={handleEnergyOut} gameData={gameData} setGameData={setGameData} setCurrentDayData={setCurrentDayData} handleCloseModal={handleCloseModal} />}
            {currentModal == "Campus" && <CampusModal handleEnergyOut={handleEnergyOut} gameData={gameData} setGameData={setGameData} setCurrentDayData={setCurrentDayData} handleCloseModal={handleCloseModal} />}
            {currentModal == "Staffing Agency" && <JobModal addSystemMessage={addSystemMessage} gameData={gameData} setGameData={setGameData} handleCloseModal={handleCloseModal} />}
            {currentModal == "Gym" && <GymModal handleEnergyOut={handleEnergyOut} incrementStat={incrementStat} addSystemMessage={addSystemMessage} gameData={gameData} setGameData={setGameData} handleCloseModal={handleCloseModal} />}
            {currentModal == "Home" && <HomeModal handleNextDayClick={handleNextDayClick} handleCloseModal={handleCloseModal} />}
            {currentModal == "energyOut" && <EnergyOutModal />}
            {currentModal == "travel" && <TravelModal desiredLocation={desiredLocation} setNewLocation={setNewLocation} handleCloseModal={handleCloseModal} />}
            {/* Reward Crate */}
            {dropRewardCrate && <RewardCrate />}
        </div>
    );
}

export default LocationHolder;