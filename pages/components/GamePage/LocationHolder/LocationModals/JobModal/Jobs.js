const mallJobs = [
    { name: "Janitor", location: "Mall", money: 10, happiness: -1, energy: -6 },
]

const cafeJobs = [
    { name: "Dishwasher", location: "Cafe", money: 10, happiness: -1, energy: -6 },
    { name: "Barista", location: "Cafe", money: 16, happiness: -1, energy: -6, requiredItems: ["Cheap Suit"], requiredExp: 50, requiredEducation: 25 },
    { name: "Test", location: "Cafe", money: 30, happiness: -1, energy: -6 },
    // manager
]

const gymJobs = [
    { name: "Cleaner", location: "Gym", money: 10, happiness: -1, energy: -6 },
    { name: "Customer Rep", location: "Gym", money: 14, happiness: -1, energy: -6, requiredItems: ["Cheap Suit"], requiredExp: 75, requiredEducation: 10  },
    // trainer
]
const campusJobs = [
    { name: "Janitor", location: "Campus", money: 11, happiness: -1, energy: -5 },
    { name: "Librarian", location: "Campus", money: 15, happiness: -1, energy: -5, requiredItems: ["Cheap Suit"], requiredExp: 75, requiredEducation: 25  },
    // Teacher
]

const hospitalJobs = [
    { name: "Cleaner", location: "Hospital", money: 10, happiness: -1, energy: -6 },
]

const gasStationJobs = [
    { name: "Cashier", location: "Gas Station", money: 13, happiness: -2, energy: -5},
]

export { mallJobs, cafeJobs, gymJobs, campusJobs, hospitalJobs, gasStationJobs };