const growthQuests = {
    "semester_gpa": {
        title: "GPA Guardian",
        description: "Maintain 3.8+ GPA this semester",
        duration: "4 months",
        milestones: [
            { target: "Midterm A+", reward: "Scholar's Ring" },
            { target: "All Assignments Done", reward: "Time Master Cloak" },
            { target: "Final GPA 3.8+", reward: "Legendary Scholar Sword" }
        ],
        finalReward: {
            xp: 5000,
            gold: 2000,
            title: "Academic Legend",
            specialPower: "Double XP for 1 week"
        }
    },
    "job_prep": {
        title: "Corporate Ninja",
        description: "Land your dream job",
        phases: [
            { name: "Resume Crafting", deadline: "2 weeks" },
            { name: "100 Problems Solved", deadline: "1 month" },
            { name: "Mock Interviews", deadline: "2 months" },
            { name: "Job Offer", deadline: "3 months" }
        ]
    }
}