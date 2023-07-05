import ToolTip from "@/pages/components/shared-components/ToolTip/ToolTip";
import styles from "./JobModal.module.css";
import { useState } from "react";
import { mallJobs, cafeJobs, gymJobs, campusJobs, hospitalJobs, gasStationJobs } from "./Jobs"
import ModalMessageBox from "@/pages/components/shared-components/ModalMessageBox/ModalMessageBox";

const WorkModal = ({ addSystemMessage, gameData, setGameData, handleCloseModal }) => {
    const [displayJobs, setDisplayJobs] = useState(false);
    const [jobLocation, setJobLocation] = useState();
    const [messageList, setMessageList] = useState(["Next in line! Welcome to the Staffing Agency", "Select a location to see its available jobs!"])
    

    const addModalMessage = (message) => {
        setMessageList(prev => {
            let updatedArray = [ ...prev ];
            updatedArray.push(message);
            return updatedArray;
        })
    }


    // Jobs are imported from "jobs.js"
    const jobList = {
        Cafe: [...cafeJobs],
        Gym: [...gymJobs],
        Mall: [...mallJobs],
        Campus: [...campusJobs],
        "Gas Station": [...gasStationJobs],
        Hospital: [...hospitalJobs]
    }


    const handleApplyClick = (job) => {
        let meetsRequirments = true;
        let failedRequirements = [];
        let missingItems = [];

        // Checks if user has required objects
        if (job.requiredItems) {
            for (let eachItem of job.requiredItems) {
  
                if (!gameData.inventory.includes(eachItem)) {
                    meetsRequirments = false;
                    missingItems.push(eachItem);
                }
            }
        }

        if (job.requiredEducation && gameData.education < job.requiredEducation) {
            meetsRequirments = false;
            failedRequirements.push(`Education`)
        }

        if (job.requiredExp && gameData.experience < job.requiredExp) {
            meetsRequirments = false;
            failedRequirements.push(`Experience`)
        }

        if (missingItems) {
            failedRequirements.push("Items")
        }


        console.log("Applied to job...", job)
        console.log("Meeting requirements: ", meetsRequirments);
        if (meetsRequirments) {
            let updatedGameData = { ...gameData };
            updatedGameData.job = job;
            setGameData(updatedGameData);
            addSystemMessage(`Started new job as a ${job.name}! Congrats!`);
            addModalMessage(`Nice work landing that job, head over to the ${job.location} to start working!`)
        } else {
            addSystemMessage("You don't meet the requirments for this job!");
            addModalMessage(`You did not meet the following requirements: ${failedRequirements.join(", ")}`)
        }

    }

    const handleLocationClick = (name) => {
        setJobLocation(name);
        setDisplayJobs(true);
    }

    const LocationButton = ({ name, color }) => {
        return (
            <div onClick={() => handleLocationClick(name)} style={{background: `${color}`}} className={styles["location-button"]}>
                <img className={styles["location-image"]} src="items/food/coffee.png" />
                <span>{name}</span>
            </div>
        );
    }


    const JobPosting = ({ job }) => {
        return (
            <div className={styles["job-posting"]}>
                <div className={styles["top-row"]}>
                    <h4 className={styles["job-posting-title"]}>{job.name}</h4>
                    <div className={styles["stat-effect-bar"]}>
                        <ToolTip text={`+${job.money} Money`}>
                            <p style={{ background: "rgb(71, 159, 71)" }}><img src="icons/money-icon.png" /> +{job.money}</p>
                        </ToolTip>
                        <ToolTip text={`${job.energy} Energy`}>
                            <p style={{ background: "rgb(83, 232, 255)" }}><img src="icons/energy-icon.png" />{job.energy}</p>
                        </ToolTip>
                        <ToolTip text={`${job.happiness} Happiness`}>
                            <p style={{ background: "rgb(243, 243, 94)" }} className={styles.money}><img src="icons/happiness-icon.png" />{job.happiness}</p>
                        </ToolTip>
                    </div>
                </div>
                <div className={styles["bottom-row"]}>
                    <button onClick={() => handleApplyClick(job)} value={job} className={styles["apply-button"]}>Apply</button>
                    <p>Requirements: {job.requiredItems && job.requiredItems.join(", ")}</p>
                </div>
                <hr style={{ margin: "0" }} />
            </div>
        )
    }

    return <div className={styles.modal}>
        <h2 className={styles["modal-title"]}>Employment Agency</h2>
        <button className={styles.exit} onClick={handleCloseModal}><img src="exit-icon.svg" /></button>
        <div className={styles["inner-window"]}>
            <div className={styles["character-section"]}>
                <img className={styles["character-image"]} src="characters/mall-npc.png" />
                <div style={{ maxHeight: "100%", overflow: "hidden" }}>
                    <ModalMessageBox modalMessageList={messageList} />
                </div>
            </div>
            <div className={styles["bottom-job-menu"]}>
                {/* Display Location menu first */}
                {!displayJobs &&
                    <>
                        <h3 style={{ fontSize: "16px", margin: "0", background: "#2b2a33" }}>Locations</h3>
                        <div className={styles["location-list"]}>
                            <LocationButton name="Cafe" color="rgba(86, 61, 5, 0.638)" />
                            <LocationButton name="Mall" color="rgba(109, 214, 255, 0.638)"/>
                            <LocationButton name="Hospital" color="rgba(255, 0, 0, 0.638)" />
                            <LocationButton name="Gas Station" color="rgba(27, 255, 91, 0.638)"/>
                            <LocationButton name="Campus" color="rgba(232, 255, 86, 0.638)" />
                            <LocationButton name="Gym" color="rgba(255, 94, 225, 0.638)" />
                        </div>
                    </>
                }


                {/* Once we get a location click we display the job menu */}
                {displayJobs && <>
                    <div className={styles["jobs-title-holder"]}>
                        <h3 style={{ fontSize: "16px", margin: "0", background: "#2b2a33" }}>Available Jobs: {jobLocation}</h3>
                        <button className={styles.back} onClick={() => setDisplayJobs(false)}>Back</button>
                    </div>
                    <div className={styles["job-list"]}>
                        {
                            jobList[jobLocation].map((job, idx) => (
                                <JobPosting key={idx} job={job} />
                            ))
                        }
                    </div>
                </>}
            </div>
        </div>

    </div>
}

export default WorkModal;