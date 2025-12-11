// Study Legends RPG Game
class StudyLegends {
    constructor() {
        // Game State
        this.player = {
            name: "Study Legend",
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            gold: 100,
            streak: 7,
            totalStudyTime: 142, // in hours
            achievements: 15
        };

        // Player Skills
        this.skills = {
            coding: { level: 3, progress: 60 },
            mathematics: { level: 2, progress: 40 },
            focus: { level: 4, progress: 80 },
            problemSolving: { level: 3, progress: 55 },
            timeManagement: { level: 2, progress: 30 },
            communication: { level: 1, progress: 20 }
        };

        // Daily Missions
        this.dailyMissions = [
            {
                id: 1,
                title: "Morning Power Hour",
                description: "Wake up at 6 AM, meditate for 15 minutes, plan your day",
                difficulty: "uncommon",
                rewards: { xp: 50, gold: 25 },
                progress: { current: 0, total: 3 },
                completed: false,
                claimed: false,
                type: "morning"
            },
            {
                id: 2,
                title: "Code Warrior Training",
                description: "Solve 3 LeetCode/HackerRank problems",
                difficulty: "rare",
                rewards: { xp: 100, gold: 50 },
                progress: { current: 2, total: 3 },
                completed: false,
                claimed: false,
                type: "coding"
            },
            {
                id: 3,
                title: "Lecture Notes Master",
                description: "Complete notes for all today's lectures within 2 hours",
                difficulty: "uncommon",
                rewards: { xp: 75, gold: 35 },
                progress: { current: 0, total: 4 },
                completed: false,
                claimed: false,
                type: "academic"
            },
            {
                id: 4,
                title: "Project Progress",
                description: "Work on your main project for at least 2 hours",
                difficulty: "epic",
                rewards: { xp: 200, gold: 100 },
                progress: { current: 1, total: 2 },
                completed: false,
                claimed: false,
                type: "project"
            },
            {
                id: 5,
                title: "Evening Review",
                description: "Review today's learning and plan for tomorrow",
                difficulty: "common",
                rewards: { xp: 30, gold: 15 },
                progress: { current: 0, total: 1 },
                completed: false,
                claimed: false,
                type: "evening"
            }
        ];

        // Growth Quests
        this.growthQuests = [
            {
                id: 1,
                title: "Semester Champion",
                description: "Complete all courses with A+ grades this semester",
                difficulty: "legendary",
                duration: "4 months",
                progress: { completed: 2, total: 5 },
                rewards: { xp: 5000, gold: 2000 },
                completed: false,
                active: true,
                milestones: [
                    "Midterm Exams - All A+",
                    "Assignments - 100% Completed",
                    "Project Work - Excellent",
                    "Class Participation - Active",
                    "Final Exams - All A+"
                ],
                currentMilestone: 0
            },
            {
                id: 2,
                title: "Code Master",
                description: "Solve 500 coding problems on various platforms",
                difficulty: "epic",
                duration: "6 months",
                progress: { completed: 127, total: 500 },
                rewards: { xp: 3000, gold: 1500 },
                completed: false,
                active: true,
                milestones: [
                    "First 100 Problems",
                    "250 Problems - Intermediate",
                    "400 Problems - Advanced",
                    "500 Problems - Master"
                ],
                currentMilestone: 1
            },
            {
                id: 3,
                title: "Research Paper",
                description: "Publish a research paper in a reputable journal",
                difficulty: "mythic",
                duration: "1 year",
                progress: { completed: 0, total: 1 },
                rewards: { xp: 10000, gold: 5000 },
                completed: false,
                active: false
            }
        ];

        // Special Events
        this.events = [
            {
                id: 1,
                name: "Midterm Exam Battle",
                type: "boss",
                boss: "Professor X",
                difficulty: "epic",
                time: "Tomorrow, 10:00 AM",
                description: "Digital Logic Design - Final Boss Battle",
                preparation: [
                    "Review all past papers",
                    "Practice circuit problems",
                    "Group study session",
                    "Mock test"
                ],
                status: "upcoming"
            },
            {
                id: 2,
                name: "24-Hour Hackathon",
                type: "marathon",
                difficulty: "legendary",
                time: "3 Days",
                description: "Build a complete project in 24 hours",
                rewards: {
                    winner: "Job Interview Ticket",
                    participation: "Networking + Experience"
                },
                status: "upcoming"
            },
            {
                id: 3,
                name: "Weekly Coding Challenge",
                type: "challenge",
                difficulty: "rare",
                time: "Every Saturday",
                description: "Weekly competitive programming contest",
                rewards: { xp: 300, gold: 150 },
                status: "recurring"
            }
        ];

        // Inventory
        this.inventory = {
            items: [
                { id: 1, name: "Coffee Potion", quantity: 5, type: "consumable", effect: "+30min focus" },
                { id: 2, name: "Focus Scroll", quantity: 3, type: "consumable", effect: "2x XP for 1 hour" },
                { id: 3, name: "Scholar's Ring", quantity: 1, type: "equipment", effect: "+10% XP gain" },
                { id: 4, name: "Time Stopper", quantity: 2, type: "consumable", effect: "Freeze timer for 15min" }
            ],
            equipment: {
                head: null,
                chest: null,
                legs: null,
                weapon: null,
                accessory: null
            }
        };

        // Game Settings
        this.settings = {
            sound: true,
            music: true,
            notifications: true,
            darkMode: true,
            autoSave: true
        };

        // Initialize game
        this.init();
    }

    init() {
        this.loadGame();
        this.setupUI();
        this.setupEventListeners();
        this.startGame();
        
        // Auto-save every 5 minutes
        if (this.settings.autoSave) {
            setInterval(() => this.saveGame(), 5 * 60 * 1000);
        }
        
        // Daily reset check
        this.checkDailyReset();
        
        // Start background music
        if (this.settings.music) {
            this.playBackgroundMusic();
        }
    }

    loadGame() {
        const savedGame = localStorage.getItem('studyLegendsSave');
        if (savedGame) {
            try {
                const data = JSON.parse(savedGame);
                Object.assign(this.player, data.player || {});
                this.dailyMissions = data.dailyMissions || this.dailyMissions;
                this.growthQuests = data.growthQuests || this.growthQuests;
                this.inventory = data.inventory || this.inventory;
                
                // Check if it's a new day
                this.checkDailyReset();
                
                this.showNotification("Game loaded successfully!", "success");
            } catch (error) {
                console.error("Error loading game:", error);
                this.showNotification("Starting new game...", "info");
            }
        }
    }

    saveGame() {
        const gameData = {
            player: this.player,
            dailyMissions: this.dailyMissions,
            growthQuests: this.growthQuests,
            inventory: this.inventory,
            skills: this.skills,
            lastSave: new Date().toISOString()
        };
        
        localStorage.setItem('studyLegendsSave', JSON.stringify(gameData));
        
        // Show save notification
        if (this.settings.notifications) {
            this.showNotification("Game saved!", "info");
        }
    }

    checkDailyReset() {
        const lastReset = localStorage.getItem('studyLegendsLastReset');
        const today = new Date().toDateString();
        
        if (!lastReset || lastReset !== today) {
            // Reset daily missions
            this.dailyMissions.forEach(mission => {
                mission.progress.current = 0;
                mission.completed = false;
                mission.claimed = false;
            });
            
            // Update streak if missions were completed yesterday
            this.updateStreak();
            
            // Save reset date
            localStorage.setItem('studyLegendsLastReset', today);
            
            // Show notification
            this.showNotification("New day! Daily missions have been reset!", "info");
        }
    }

    updateStreak() {
        // Check if all missions were completed yesterday
        const yesterdayCompleted = localStorage.getItem('yesterdayCompleted');
        if (yesterdayCompleted === 'true') {
            this.player.streak++;
            this.showNotification(`🔥 Streak increased to ${this.player.streak} days!`, "success");
            
            // Award bonus for 7-day streak
            if (this.player.streak % 7 === 0) {
                this.addXP(500);
                this.addGold(250);
                this.showNotification(`🎉 ${this.player.streak} day streak bonus! +500 XP, +250 Gold`, "legendary");
            }
        }
        
        // Reset yesterday's status
        localStorage.setItem('yesterdayCompleted', 'false');
    }

    setupUI() {
        // Hide loading screen after 2 seconds
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('gameContainer').style.opacity = '1';
        }, 2000);

        // Update player stats
        this.updatePlayerStats();
        
        // Load missions
        this.loadMissions();
        
        // Load quests
        this.loadQuests();
        
        // Load events
        this.loadEvents();
        
        // Update dashboard
        this.updateDashboard();
    }

    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Control buttons
        document.getElementById('inventoryBtn').addEventListener('click', () => this.showInventory());
        document.getElementById('skillsBtn').addEventListener('click', () => this.showSkills());
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());

        // Quick actions
        document.getElementById('quickStudy').addEventListener('click', () => this.startQuickStudy());
        document.getElementById('addMission').addEventListener('click', () => this.addCustomMission());

        // Claim all missions
        document.getElementById('claimAllMissions').addEventListener('click', () => this.claimAllCompletedMissions());

        // Mission filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.filterQuests(filter);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Number keys for quick navigation
            if (e.key >= '1' && e.key <= '6') {
                const sections = ['dashboard', 'missions', 'quests', 'events', 'arena', 'shop'];
                const index = parseInt(e.key) - 1;
                if (sections[index]) {
                    this.showSection(sections[index]);
                }
            }
            
            // Space for quick study
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.startQuickStudy();
            }
            
            // Escape to close modals
            if (e.code === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    startGame() {
        // Start game loop
        this.gameLoop();
        
        // Play welcome sound
        if (this.settings.sound) {
            this.playSound('welcome');
        }
        
        // Show welcome message
        setTimeout(() => {
            this.showNotification("Welcome to Study Legends! Begin your academic adventure!", "welcome");
        }, 3000);
    }

    gameLoop() {
        // Update UI every second
        setInterval(() => {
            this.updateLiveStats();
        }, 1000);
        
        // Save game every 30 seconds
        setInterval(() => {
            if (this.settings.autoSave) {
                this.saveGame();
            }
        }, 30000);
        
        // Check for achievements every minute
        setInterval(() => {
            this.checkAchievements();
        }, 60000);
    }

    updatePlayerStats() {
        // Update XP bar
        const xpPercentage = (this.player.xp / this.player.xpToNextLevel) * 100;
        document.getElementById('xpBar').style.width = `${xpPercentage}%`;
        document.getElementById('xpText').textContent = `${this.player.xp}/${this.player.xpToNextLevel}`;
        
        // Update gold bar (cap at 1000 for display)
        const goldPercentage = (this.player.gold / 1000) * 100;
        document.getElementById('goldBar').style.width = `${goldPercentage}%`;
        document.getElementById('goldText').textContent = `${this.player.gold}/1000`;
        
        // Update level
        document.getElementById('playerLevel').textContent = this.player.level;
        
        // Update player name
        document.getElementById('playerName').textContent = this.player.name;
        
        // Update footer stats
        document.getElementById('totalTime').textContent = `${this.player.totalStudyTime} hrs`;
        document.getElementById('achievementCount').textContent = this.player.achievements;
        document.getElementById('currentStreak').textContent = `${this.player.streak} days`;
        
        // Update daily progress
        const completedMissions = this.dailyMissions.filter(m => m.completed).length;
        const totalMissions = this.dailyMissions.length;
        const dailyProgress = (completedMissions / totalMissions) * 100;
        
        const progressCircle = document.querySelector('.progress-circle[data-progress]');
        if (progressCircle) {
            const fill = progressCircle.querySelector('.progress-fill');
            const percent = progressCircle.querySelector('.percent');
            const radius = 54;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (dailyProgress / 100) * circumference;
            
            fill.style.strokeDasharray = `${circumference} ${circumference}`;
            fill.style.strokeDashoffset = offset;
            percent.textContent = `${Math.round(dailyProgress)}%`;
        }
        
        // Update mission stats
        const missionStats = document.querySelector('.mission-stats');
        if (missionStats) {
            missionStats.querySelector('.streak').textContent = `🔥 ${this.player.streak}`;
            missionStats.querySelector('.completed').textContent = `${completedMissions}/${totalMissions} Completed`;
        }
    }

    updateLiveStats() {
        // Update time if there's an active timer
        const activeTimer = document.querySelector('.active-timer');
        if (activeTimer) {
            // Update timer logic here
        }
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.game-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Update active nav button
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.section === sectionId) {
                    btn.classList.add('active');
                }
            });
            
            // Play section change sound
            if (this.settings.sound) {
                this.playSound('click');
            }
            
            // Load section-specific content
            switch(sectionId) {
                case 'missions':
                    this.loadMissions();
                    break;
                case 'quests':
                    this.loadQuests();
                    break;
                case 'events':
                    this.loadEvents();
                    break;
                case 'arena':
                    this.loadArena();
                    break;
                case 'shop':
                    this.loadShop();
                    break;
            }
        }
    }

    loadMissions() {
        const missionsGrid = document.querySelector('.missions-grid');
        if (!missionsGrid) return;
        
        missionsGrid.innerHTML = '';
        
        this.dailyMissions.forEach(mission => {
            const missionCard = this.createMissionCard(mission);
            missionsGrid.appendChild(missionCard);
        });
        
        // Update mission stats
        this.updateMissionStats();
    }

    createMissionCard(mission) {
        const card = document.createElement('div');
        card.className = `mission-card ${mission.difficulty}`;
        
        const progressPercentage = (mission.progress.current / mission.progress.total) * 100;
        const isCompleted = mission.progress.current >= mission.progress.total;
        
        card.innerHTML = `
            <div class="mission-header">
                <div class="mission-title">
                    <h3>${mission.title}</h3>
                    <p class="mission-type">${this.getMissionTypeIcon(mission.type)} ${mission.type}</p>
                </div>
                <span class="mission-difficulty">${mission.difficulty}</span>
            </div>
            
            <p class="mission-description">${mission.description}</p>
            
            <div class="mission-rewards">
                <div class="reward-item xp">
                    <i class="fas fa-star"></i>
                    <span>+${mission.rewards.xp} XP</span>
                </div>
                <div class="reward-item gold">
                    <i class="fas fa-coins"></i>
                    <span>+${mission.rewards.gold} Gold</span>
                </div>
            </div>
            
            <div class="mission-progress">
                <div class="progress-label">
                    <span>Progress</span>
                    <span>${mission.progress.current}/${mission.progress.total}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
            
            <div class="mission-actions">
                ${isCompleted && !mission.claimed ? 
                    `<button class="btn-mission btn-claim" data-id="${mission.id}">
                        <i class="fas fa-gift"></i> Claim Reward
                    </button>` : 
                    !mission.completed ? 
                    `<button class="btn-mission btn-start" data-id="${mission.id}">
                        <i class="fas fa-play"></i> Start Mission
                    </button>
                    <button class="btn-mission btn-complete" data-id="${mission.id}">
                        <i class="fas fa-check"></i> Complete
                    </button>` :
                    `<span class="mission-completed">
                        <i class="fas fa-check-circle"></i> Completed
                    </span>`
                }
            </div>
        `;
        
        // Add event listeners
        const startBtn = card.querySelector('.btn-start');
        const completeBtn = card.querySelector('.btn-complete');
        const claimBtn = card.querySelector('.btn-claim');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startMission(mission.id));
        }
        
        if (completeBtn) {
            completeBtn.addEventListener('click', () => this.completeMission(mission.id));
        }
        
        if (claimBtn) {
            claimBtn.addEventListener('click', () => this.claimMission(mission.id));
        }
        
        return card;
    }

    getMissionTypeIcon(type) {
        const icons = {
            morning: '🌅',
            coding: '💻',
            academic: '📚',
            project: '🚀',
            evening: '🌙',
            exercise: '💪',
            meditation: '🧘',
            planning: '📝'
        };
        return icons[type] || '🎯';
    }

    startMission(missionId) {
        const mission = this.dailyMissions.find(m => m.id === missionId);
        if (!mission || mission.completed) return;
        
        this.showNotification(`Starting "${mission.title}"! Good luck!`, "info");
        
        // Play mission start sound
        if (this.settings.sound) {
            this.playSound('missionStart');
        }
        
        // In a real game, this would start a timer or open a study interface
        // For now, we'll simulate progress
        if (mission.type === 'coding') {
            this.openCodeEditor();
        } else if (mission.type === 'academic') {
            this.openStudyNotes();
        }
    }

    completeMission(missionId) {
        const mission = this.dailyMissions.find(m => m.id === missionId);
        if (!mission || mission.completed) return;
        
        mission.progress.current = mission.progress.total;
        mission.completed = true;
        
        this.showNotification(`Mission "${mission.title}" completed!`, "success");
        
        // Play completion sound
        if (this.settings.sound) {
            this.playSound('missionComplete');
        }
        
        // Save and update UI
        this.saveGame();
        this.loadMissions();
        this.updatePlayerStats();
    }

    claimMission(missionId) {
        const mission = this.dailyMissions.find(m => m.id === missionId);
        if (!mission || !mission.completed || mission.claimed) return;
        
        // Award rewards
        this.addXP(mission.rewards.xp);
        this.addGold(mission.rewards.gold);
        
        mission.claimed = true;
        
        // Check if all missions are completed for streak
        const allCompleted = this.dailyMissions.every(m => m.completed);
        if (allCompleted) {
            localStorage.setItem('yesterdayCompleted', 'true');
        }
        
        this.showNotification(
            `Mission rewards claimed! +${mission.rewards.xp} XP, +${mission.rewards.gold} Gold`,
            "success"
        );
        
        // Play reward sound
        if (this.settings.sound) {
            this.playSound('reward');
        }
        
        // Save and update UI
        this.saveGame();
        this.loadMissions();
        this.updatePlayerStats();
        
        // Check for level up
        this.checkLevelUp();
    }

    claimAllCompletedMissions() {
        const completedMissions = this.dailyMissions.filter(m => m.completed && !m.claimed);
        
        if (completedMissions.length === 0) {
            this.showNotification("No completed missions to claim!", "warning");
            return;
        }
        
        let totalXP = 0;
        let totalGold = 0;
        
        completedMissions.forEach(mission => {
            totalXP += mission.rewards.xp;
            totalGold += mission.rewards.gold;
            mission.claimed = true;
        });
        
        // Award total rewards
        this.addXP(totalXP);
        this.addGold(totalGold);
        
        this.showNotification(
            `All rewards claimed! Total: +${totalXP} XP, +${totalGold} Gold`,
            "legendary"
        );
        
        // Play celebration sound
        if (this.settings.sound) {
            this.playSound('celebration');
        }
        
        // Save and update UI
        this.saveGame();
        this.loadMissions();
        this.updatePlayerStats();
        
        // Check for level up
        this.checkLevelUp();
    }

    loadQuests() {
        const questsContainer = document.querySelector('.quests-container');
        if (!questsContainer) return;
        
        questsContainer.innerHTML = '';
        
        this.growthQuests.forEach(quest => {
            if (quest.active || quest.completed) {
                const questCard = this.createQuestCard(quest);
                questsContainer.appendChild(questCard);
            }
        });
    }

    createQuestCard(quest) {
        const card = document.createElement('div');
        card.className = `quest-card ${quest.difficulty}`;
        
        const progressPercentage = (quest.progress.completed / quest.progress.total) * 100;
        
        card.innerHTML = `
            <div class="quest-header">
                <div class="quest-title">
                    <h3>${quest.title}</h3>
                    <span class="quest-duration">${quest.duration}</span>
                </div>
                <span class="quest-difficulty">${quest.difficulty}</span>
            </div>
            
            <p class="quest-description">${quest.description}</p>
            
            ${quest.milestones ? `
                <div class="quest-milestones">
                    <h4>Milestones:</h4>
                    <ul>
                        ${quest.milestones.map((milestone, index) => `
                            <li class="${index <= quest.currentMilestone ? 'completed' : ''}">
                                <i class="fas fa-${index <= quest.currentMilestone ? 'check-circle' : 'circle'}"></i>
                                ${milestone}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}
            
            <div class="quest-progress">
                <div class="progress-label">
                    <span>Progress</span>
                    <span>${quest.progress.completed}/${quest.progress.total}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
            
            <div class="quest-rewards">
                <div class="reward-item xp">
                    <i class="fas fa-star"></i>
                    <span>+${quest.rewards.xp} XP</span>
                </div>
                <div class="reward-item gold">
                    <i class="fas fa-coins"></i>
                    <span>+${quest.rewards.gold} Gold</span>
                </div>
            </div>
            
            <div class="quest-actions">
                ${quest.completed ? 
                    `<span class="quest-completed">
                        <i class="fas fa-trophy"></i> Quest Complete!
                    </span>` :
                    `<button class="btn-quest update-progress" data-id="${quest.id}">
                        <i class="fas fa-arrow-up"></i> Update Progress
                    </button>`
                }
            </div>
        `;
        
        // Add event listener for update progress button
        const updateBtn = card.querySelector('.update-progress');
        if (updateBtn) {
            updateBtn.addEventListener('click', () => this.updateQuestProgress(quest.id));
        }
        
        return card;
    }

    updateQuestProgress(questId) {
        const quest = this.growthQuests.find(q => q.id === questId);
        if (!quest || quest.completed) return;
        
        // In a real game, this would open a dialog to update progress
        // For now, we'll simulate progress
        const newProgress = Math.min(quest.progress.completed + 1, quest.progress.total);
        quest.progress.completed = newProgress;
        
        // Check if milestone reached
        if (quest.milestones) {
            const milestoneIndex = Math.floor((newProgress / quest.progress.total) * quest.milestones.length);
            if (milestoneIndex > quest.currentMilestone) {
                quest.currentMilestone = milestoneIndex;
                this.showNotification(`Milestone reached: ${quest.milestones[milestoneIndex]}`, "success");
            }
        }
        
        // Check if quest completed
        if (newProgress >= quest.progress.total) {
            quest.completed = true;
            this.completeQuest(quest);
        }
        
        this.showNotification(`Quest progress updated!`, "info");
        
        // Save and update UI
        this.saveGame();
        this.loadQuests();
        this.updatePlayerStats();
    }

    completeQuest(quest) {
        // Award rewards
        this.addXP(quest.rewards.xp);
        this.addGold(quest.rewards.gold);
        
        // Award special items for epic/legendary quests
        if (quest.difficulty === 'epic' || quest.difficulty === 'legendary') {
            this.addItemToInventory({
                name: `${quest.title} Trophy`,
                type: 'trophy',
                effect: 'Permanent +5% XP gain'
            });
        }
        
        this.showNotification(
            `Quest "${quest.title}" completed! +${quest.rewards.xp} XP, +${quest.rewards.gold} Gold`,
            "legendary"
        );
        
        // Play quest complete sound
        if (this.settings.sound) {
            this.playSound('questComplete');
        }
        
        // Check for level up
        this.checkLevelUp();
    }

    filterQuests(filter) {
        const questCards = document.querySelectorAll('.quest-card');
        
        questCards.forEach(card => {
            switch(filter) {
                case 'active':
                    card.style.display = card.classList.contains('completed') ? 'none' : 'block';
                    break;
                case 'completed':
                    card.style.display = card.classList.contains('completed') ? 'block' : 'none';
                    break;
                case 'epic':
                    card.style.display = card.classList.contains('epic') ? 'block' : 'none';
                    break;
                default:
                    card.style.display = 'block';
            }
        });
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
    }

    loadEvents() {
        const eventsContainer = document.querySelector('.events-container');
        if (!eventsContainer) return;
        
        eventsContainer.innerHTML = '';
        
        this.events.forEach(event => {
            const eventCard = this.createEventCard(event);
            eventsContainer.appendChild(eventCard);
        });
    }

    createEventCard(event) {
        const card = document.createElement('div');
        card.className = `event-card ${event.difficulty}`;
        
        card.innerHTML = `
            <div class="event-header">
                <h3>${event.name}</h3>
                <span class="event-type">${event.type.toUpperCase()}</span>
            </div>
            
            <div class="event-body">
                <p class="event-description">${event.description}</p>
                
                <div class="event-details">
                    <div class="detail">
                        <i class="fas fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-swords"></i>
                        <span>${event.difficulty}</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-calendar"></i>
                        <span>${event.status}</span>
                    </div>
                </div>
                
                ${event.preparation ? `
                    <div class="event-preparation">
                        <h4>Preparation:</h4>
                        <ul>
                            ${event.preparation.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${event.rewards ? `
                    <div class="event-rewards">
                        <h4>Rewards:</h4>
                        <p>${typeof event.rewards === 'object' ? 
                            Object.entries(event.rewards).map(([key, value]) => 
                                `<strong>${key}:</strong> ${value}`
                            ).join('<br>') : 
                            event.rewards
                        }</p>
                    </div>
                ` : ''}
            </div>
            
            <div class="event-actions">
                ${event.status === 'upcoming' ? 
                    `<button class="btn-event prepare-event" data-id="${event.id}">
                        <i class="fas fa-swords"></i> Prepare
                    </button>` :
                    `<button class="btn-event join-event" data-id="${event.id}">
                        <i class="fas fa-gamepad"></i> Join Event
                    </button>`
                }
            </div>
        `;
        
        // Add event listeners
        const prepareBtn = card.querySelector('.prepare-event');
        const joinBtn = card.querySelector('.join-event');
        
        if (prepareBtn) {
            prepareBtn.addEventListener('click', () => this.prepareForEvent(event.id));
        }
        
        if (joinBtn) {
            joinBtn.addEventListener('click', () => this.joinEvent(event.id));
        }
        
        return card;
    }

    prepareForEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;
        
        this.showNotification(`Preparing for "${event.name}"...`, "info");
        
        // In a real game, this would open a preparation interface
        // For exam events, show study materials
        if (event.type === 'boss' && event.boss === 'Professor X') {
            this.openStudyMaterials('Digital Logic Design');
        }
    }

    joinEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;
        
        this.showNotification(`Joining "${event.name}"... Good luck!`, "success");
        
        // In a real game, this would start the event
        // For now, simulate participation
        setTimeout(() => {
            const success = Math.random() > 0.3; // 70% success rate
            
            if (success) {
                this.addXP(300);
                this.addGold(150);
                this.showNotification(`Event completed successfully! +300 XP, +150 Gold`, "success");
            } else {
                this.showNotification(`Event completed with moderate success. Better luck next time!`, "warning");
            }
            
            this.updatePlayerStats();
            this.checkLevelUp();
        }, 2000);
    }

    addXP(amount) {
        this.player.xp += amount;
        
        // Check for level up
        while (this.player.xp >= this.player.xpToNextLevel) {
            this.player.xp -= this.player.xpToNextLevel;
            this.player.level++;
            this.player.xpToNextLevel = Math.floor(this.player.xpToNextLevel * 1.5); // Scale difficulty
            
            // Level up effects
            this.levelUp();
        }
        
        this.updatePlayerStats();
    }

    addGold(amount) {
        this.player.gold += amount;
        this.updatePlayerStats();
    }

    levelUp() {
        // Play level up sound
        if (this.settings.sound) {
            this.playSound('levelUp');
        }
        
        // Show level up notification
        this.showNotification(`🎉 LEVEL UP! You are now Level ${this.player.level}!`, "legendary");
        
        // Award level up bonus
        const bonusGold = this.player.level * 100;
        this.addGold(bonusGold);
        
        // Random item reward
        const randomItems = [
            { name: "Level Up Potion", effect: "Full XP boost for 1 hour" },
            { name: "Golden Textbook", effect: "+25% study efficiency" },
            { name: "Scholar's Medal", effect: "Permanent +2% XP gain" }
        ];
        
        const randomItem = randomItems[Math.floor(Math.random() * randomItems.length)];
        this.addItemToInventory(randomItem);
        
        // Fire confetti
        this.fireConfetti();
        
        // Update skills
        this.improveRandomSkill();
    }

    improveRandomSkill() {
        const skills = Object.keys(this.skills);
        const randomSkill = skills[Math.floor(Math.random() * skills.length)];
        
        if (this.skills[randomSkill].progress >= 100) {
            this.skills[randomSkill].level++;
            this.skills[randomSkill].progress = 0;
        } else {
            this.skills[randomSkill].progress += 20;
        }
        
        this.showNotification(`${randomSkill} skill improved!`, "success");
        this.updateDashboard();
    }

    addItemToInventory(item) {
        const existingItem = this.inventory.items.find(i => i.name === item.name);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.inventory.items.push({
                id: this.inventory.items.length + 1,
                ...item,
                quantity: 1
            });
        }
        
        this.showNotification(`New item acquired: ${item.name}!`, "info");
    }

    checkAchievements() {
        const newAchievements = [];
        
        // Check for study time achievements
        if (this.player.totalStudyTime >= 100 && !this.player.achievements.includes("100_hours")) {
            newAchievements.push({ name: "100 Hours Studied", xp: 500 });
        }
        
        if (this.player.totalStudyTime >= 500 && !this.player.achievements.includes("500_hours")) {
            newAchievements.push({ name: "500 Hours Studied", xp: 2500 });
        }
        
        // Check for streak achievements
        if (this.player.streak >= 30 && !this.player.achievements.includes("30_day_streak")) {
            newAchievements.push({ name: "30 Day Streak", xp: 1000 });
        }
        
        // Award achievements
        newAchievements.forEach(achievement => {
            this.player.achievements++;
            this.addXP(achievement.xp);
            this.showNotification(`🏆 Achievement Unlocked: ${achievement.name}! +${achievement.xp} XP`, "epic");
        });
    }

    checkLevelUp() {
        // Already handled in addXP method
    }

    updateDashboard() {
        // Update skill levels display
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = '';
            
            Object.entries(this.skills).forEach(([skill, data]) => {
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-item';
                
                // Create level dots
                const dots = Array(5).fill(0).map((_, i) => 
                    `<span class="dot ${i < data.level ? 'active' : ''}"></span>`
                ).join('');
                
                skillItem.innerHTML = `
                    <div class="skill-icon ${skill}">
                        <i class="fas fa-${this.getSkillIcon(skill)}"></i>
                    </div>
                    <div class="skill-info">
                        <h4>${this.formatSkillName(skill)}</h4>
                        <div class="skill-level">
                            <div class="level-dots">
                                ${dots}
                            </div>
                            <span class="level-text">Lvl ${data.level}</span>
                        </div>
                        <div class="skill-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${data.progress}%"></div>
                            </div>
                        </div>
                    </div>
                `;
                
                skillsGrid.appendChild(skillItem);
            });
        }
    }

    getSkillIcon(skill) {
        const icons = {
            coding: 'code',
            mathematics: 'calculator',
            focus: 'brain',
            problemSolving: 'puzzle-piece',
            timeManagement: 'clock',
            communication: 'comments'
        };
        return icons[skill] || 'star';
    }

    formatSkillName(skill) {
        return skill.split(/(?=[A-Z])/).join(' ');
    }

    startQuickStudy() {
        // Create quick study interface
        const studyTime = prompt("Enter study time in minutes:", "25");
        if (!studyTime || isNaN(studyTime)) return;
        
        const subject = prompt("Enter subject:", "Coding");
        if (!subject) return;
        
        this.showNotification(`Starting ${studyTime}-minute study session for ${subject}...`, "info");
        
        // Start timer
        this.startStudyTimer(parseInt(studyTime), subject);
    }

    startStudyTimer(minutes, subject) {
        let timeLeft = minutes * 60;
        
        // Create timer display
        const timerDisplay = document.createElement('div');
        timerDisplay.className = 'study-timer';
        timerDisplay.innerHTML = `
            <div class="timer-content">
                <h3>${subject} Study Session</h3>
                <div class="timer">${this.formatTime(timeLeft)}</div>
                <div class="timer-controls">
                    <button class="btn-timer pause"><i class="fas fa-pause"></i></button>
                    <button class="btn-timer stop"><i class="fas fa-stop"></i></button>
                </div>
            </div>
        `;
        
        document.body.appendChild(timerDisplay);
        
        // Timer logic
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.querySelector('.timer').textContent = this.formatTime(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                this.completeStudySession(minutes, subject);
                timerDisplay.remove();
            }
        }, 1000);
        
        // Timer controls
        timerDisplay.querySelector('.pause').addEventListener('click', () => {
            // Pause/resume logic
        });
        
        timerDisplay.querySelector('.stop').addEventListener('click', () => {
            clearInterval(timerInterval);
            timerDisplay.remove();
            this.showNotification("Study session stopped.", "warning");
        });
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    completeStudySession(minutes, subject) {
        // Calculate rewards
        const xpEarned = minutes * 2; // 2 XP per minute
        const goldEarned = minutes; // 1 Gold per minute
        
        // Update stats
        this.addXP(xpEarned);
        this.addGold(goldEarned);
        this.player.totalStudyTime += minutes / 60; // Convert to hours
        
        // Improve relevant skill
        if (subject.toLowerCase().includes('code')) {
            this.skills.coding.progress += 5;
        } else if (subject.toLowerCase().includes('math')) {
            this.skills.mathematics.progress += 5;
        }
        this.skills.focus.progress += 3;
        
        this.showNotification(
            `Study session completed! +${xpEarned} XP, +${goldEarned} Gold`,
            "success"
        );
        
        // Play completion sound
        if (this.settings.sound) {
            this.playSound('sessionComplete');
        }
        
        // Save and update
        this.saveGame();
        this.updatePlayerStats();
        this.updateDashboard();
        this.checkAchievements();
        this.checkLevelUp();
    }

    addCustomMission() {
        const title = prompt("Enter mission title:");
        if (!title) return;
        
        const description = prompt("Enter mission description:");
        if (!description) return;
        
        const difficulty = prompt("Enter difficulty (common/uncommon/rare/epic):", "uncommon");
        if (!['common', 'uncommon', 'rare', 'epic'].includes(difficulty)) return;
        
        const newMission = {
            id: this.dailyMissions.length + 1,
            title,
            description,
            difficulty,
            rewards: { 
                xp: difficulty === 'common' ? 30 : 
                     difficulty === 'uncommon' ? 50 : 
                     difficulty === 'rare' ? 100 : 200,
                gold: difficulty === 'common' ? 15 : 
                      difficulty === 'uncommon' ? 25 : 
                      difficulty === 'rare' ? 50 : 100
            },
            progress: { current: 0, total: 1 },
            completed: false,
            claimed: false,
            type: "custom"
        };
        
        this.dailyMissions.push(newMission);
        this.showNotification(`Custom mission "${title}" added!`, "success");
        
        // Save and reload missions
        this.saveGame();
        this.loadMissions();
    }

    showInventory() {
        // Create inventory modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'inventoryModal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-backpack"></i> Inventory</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="inventory-grid">
                        ${this.inventory.items.map(item => `
                            <div class="inventory-item">
                                <div class="item-icon">
                                    <i class="fas fa-${item.type === 'consumable' ? 'potion' : 'ring'}"></i>
                                    <span class="item-quantity">${item.quantity}</span>
                                </div>
                                <div class="item-info">
                                    <h4>${item.name}</h4>
                                    <p>${item.effect}</p>
                                </div>
                                ${item.type === 'consumable' ? 
                                    `<button class="btn-use" data-id="${item.id}">Use</button>` : 
                                    `<span class="item-equipped">Equipped</span>`
                                }
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Add use button functionality
        modal.querySelectorAll('.btn-use').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.id);
                this.useItem(itemId);
                modal.remove();
            });
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    useItem(itemId) {
        const item = this.inventory.items.find(i => i.id === itemId);
        if (!item || item.quantity <= 0) return;
        
        item.quantity--;
        
        // Apply item effect
        switch(item.name) {
            case "Coffee Potion":
                this.addXP(50);
                this.showNotification("Coffee Potion used! +50 XP, +30min focus boost", "success");
                break;
            case "Focus Scroll":
                // In real game, this would start a timer for 2x XP
                this.showNotification("Focus Scroll activated! 2x XP for 1 hour", "epic");
                break;
            case "Time Stopper":
                // Pause all timers
                this.showNotification("Time Stopper used! All timers paused for 15min", "info");
                break;
        }
        
        // Remove item if quantity is 0
        if (item.quantity <= 0) {
            this.inventory.items = this.inventory.items.filter(i => i.id !== itemId);
        }
        
        this.saveGame();
        this.updatePlayerStats();
    }

    showSkills() {
        // Similar to showInventory but for skills
        // Would show detailed skill tree
        this.showNotification("Skills interface coming soon!", "info");
    }

    showSettings() {
        // Create settings modal
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'settingsModal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-cog"></i> Settings</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="settings-grid">
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" ${this.settings.sound ? 'checked' : ''} id="soundSetting">
                                Sound Effects
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" ${this.settings.music ? 'checked' : ''} id="musicSetting">
                                Background Music
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" ${this.settings.notifications ? 'checked' : ''} id="notifSetting">
                                Notifications
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" ${this.settings.autoSave ? 'checked' : ''} id="saveSetting">
                                Auto Save
                            </label>
                        </div>
                        <div class="setting-item">
                            <button class="btn-danger" id="resetGame">
                                <i class="fas fa-trash"></i> Reset Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.saveSettings();
            modal.remove();
        });
        
        // Add reset game functionality
        modal.querySelector('#resetGame').addEventListener('click', () => {
            if (confirm("Are you sure you want to reset the game? All progress will be lost!")) {
                localStorage.removeItem('studyLegendsSave');
                location.reload();
            }
        });
        
        // Save settings on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.saveSettings();
                modal.remove();
            }
        });
    }

    saveSettings() {
        this.settings.sound = document.getElementById('soundSetting')?.checked ?? true;
        this.settings.music = document.getElementById('musicSetting')?.checked ?? true;
        this.settings.notifications = document.getElementById('notifSetting')?.checked ?? true;
        this.settings.autoSave = document.getElementById('saveSetting')?.checked ?? true;
        
        // Update music
        if (this.settings.music) {
            this.playBackgroundMusic();
        } else {
            this.stopBackgroundMusic();
        }
        
        this.showNotification("Settings saved!", "success");
    }

    playBackgroundMusic() {
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
        }
    }

    stopBackgroundMusic() {
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.pause();
        }
    }

    playSound(soundName) {
        if (!this.settings.sound) return;
        
        const soundMap = {
            click: 'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3',
            missionStart: 'https://assets.mixkit.co/sfx/preview/mixkit-game-ball-tap-2073.mp3',
            missionComplete: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3',
            reward: 'https://assets.mixkit.co/sfx/preview/mixkit-coins-handling-1939.mp3',
            celebration: 'https://assets.mixkit.co/sfx/preview/mixkit-party-horn-sound-2927.mp3',
            levelUp: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-trumpet-2018.mp3',
            questComplete: 'https://assets.mixkit.co/sfx/preview/mixkit-game-show-wrong-answer-buzz-950.mp3',
            sessionComplete: 'https://assets.mixkit.co/sfx/preview/mixkit-completion-of-a-level-2063.mp3',
            welcome: 'https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkles-3000.mp3'
        };
        
        const audio = new Audio(soundMap[soundName] || soundMap.click);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Sound play failed:", e));
    }

    showNotification(message, type = "info") {
        if (!this.settings.notifications) return;
        
        const notificationContainer = document.getElementById('notificationContainer');
        if (!notificationContainer) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = this.getNotificationIcon(type);
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <div class="notification-content">
                <h4>${this.getNotificationTitle(type)}</h4>
                <p>${message}</p>
            </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle',
            welcome: 'gem',
            epic: 'crown',
            legendary: 'trophy'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationTitle(type) {
        const titles = {
            success: 'Success!',
            error: 'Error!',
            warning: 'Warning!',
            info: 'Notice',
            welcome: 'Welcome!',
            epic: 'Epic!',
            legendary: 'Legendary!'
        };
        return titles[type] || 'Notification';
    }

    fireConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    openCodeEditor() {
        // In a real game, this would open a code editor interface
        this.showNotification("Opening code editor... Practice your skills!", "info");
    }

    openStudyNotes() {
        // In a real game, this would open study materials
        this.showNotification("Opening study notes... Learn and grow!", "info");
    }

    openStudyMaterials(subject) {
        // In a real game, this would open subject-specific materials
        this.showNotification(`Opening ${subject} study materials... Good luck!`, "info");
    }

    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.remove();
        });
    }

    updateMissionStats() {
        const completed = this.dailyMissions.filter(m => m.completed).length;
        const total = this.dailyMissions.length;
        
        const statsElement = document.querySelector('.mission-stats .completed');
        if (statsElement) {
            statsElement.textContent = `${completed}/${total} Completed`;
        }
    }

    loadArena() {
        const arenaContainer = document.querySelector('.arena-container');
        if (!arenaContainer) return;
        
        arenaContainer.innerHTML = `
            <div class="arena-content">
                <h2><i class="fas fa-swords"></i> Study Arena</h2>
                <p class="arena-description">Test your knowledge against challenging opponents!</p>
                
                <div class="arena-opponents">
                    <div class="opponent-card" data-difficulty="easy">
                        <div class="opponent-icon">
                            <i class="fas fa-robot"></i>
                        </div>
                        <h3>Code Bot</h3>
                        <p>Basic programming challenges</p>
                        <button class="btn-challenge" data-opponent="codebot">Challenge</button>
                    </div>
                    
                    <div class="opponent-card" data-difficulty="medium">
                        <div class="opponent-icon">
                            <i class="fas fa-book"></i>
                        </div>
                        <h3>Math Wizard</h3>
                        <p>Complex math problems</p>
                        <button class="btn-challenge" data-opponent="mathwizard">Challenge</button>
                    </div>
                    
                    <div class="opponent-card" data-difficulty="hard">
                        <div class="opponent-icon">
                            <i class="fas fa-brain"></i>
                        </div>
                        <h3>Logic Master</h3>
                        <p>Advanced logic puzzles</p>
                        <button class="btn-challenge" data-opponent="logicmaster">Challenge</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add challenge event listeners
        arenaContainer.querySelectorAll('.btn-challenge').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const opponent = e.target.dataset.opponent;
                this.startArenaBattle(opponent);
            });
        });
    }

    startArenaBattle(opponent) {
        this.showNotification(`Challenging ${opponent}... Good luck!`, "info");
        
        // Simulate battle
        setTimeout(() => {
            const victory = Math.random() > 0.4; // 60% win rate
            
            if (victory) {
                const xpReward = 200;
                const goldReward = 100;
                
                this.addXP(xpReward);
                this.addGold(goldReward);
                
                this.showNotification(
                    `Victory! Defeated ${opponent}! +${xpReward} XP, +${goldReward} Gold`,
                    "success"
                );
                
                // Improve relevant skill
                if (opponent === 'codebot') {
                    this.skills.coding.progress += 10;
                } else if (opponent === 'mathwizard') {
                    this.skills.mathematics.progress += 10;
                } else {
                    this.skills.problemSolving.progress += 10;
                }
            } else {
                this.showNotification(`Defeated by ${opponent}. Try again!`, "warning");
            }
            
            this.updateDashboard();
            this.checkLevelUp();
        }, 2000);
    }

    loadShop() {
        const shopContainer = document.querySelector('.shop-container');
        if (!shopContainer) return;
        
        shopContainer.innerHTML = `
            <div class="shop-content">
                <h2><i class="fas fa-store"></i> Study Shop</h2>
                <p class="shop-description">Spend your hard-earned gold on useful items!</p>
                
                <div class="shop-items">
                    <div class="shop-item" data-id="coffee">
                        <div class="item-icon">
                            <i class="fas fa-mug-hot"></i>
                        </div>
                        <h3>Coffee Potion</h3>
                        <p>+30min focus boost</p>
                        <div class="item-price">
                            <i class="fas fa-coins"></i>
                            <span>25 Gold</span>
                        </div>
                        <button class="btn-buy" data-item="coffee">Buy</button>
                    </div>
                    
                    <div class="shop-item" data-id="focus">
                        <div class="item-icon">
                            <i class="fas fa-scroll"></i>
                        </div>
                        <h3>Focus Scroll</h3>
                        <p>2x XP for 1 hour</p>
                        <div class="item-price">
                            <i class="fas fa-coins"></i>
                            <span>50 Gold</span>
                        </div>
                        <button class="btn-buy" data-item="focus">Buy</button>
                    </div>
                    
                    <div class="shop-item" data-id="time">
                        <div class="item-icon">
                            <i class="fas fa-hourglass"></i>
                        </div>
                        <h3>Time Stopper</h3>
                        <p>Freeze timer for 15min</p>
                        <div class="item-price">
                            <i class="fas fa-coins"></i>
                            <span>75 Gold</span>
                        </div>
                        <button class="btn-buy" data-item="time">Buy</button>
                    </div>
                </div>
                
                <div class="player-gold">
                    <i class="fas fa-coins"></i>
                    <span>Your Gold: ${this.player.gold}</span>
                </div>
            </div>
        `;
        
        // Add buy event listeners
        shopContainer.querySelectorAll('.btn-buy').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const item = e.target.dataset.item;
                this.buyItem(item);
            });
        });
    }

    buyItem(item) {
        const prices = {
            coffee: 25,
            focus: 50,
            time: 75
        };
        
        const price = prices[item];
        
        if (this.player.gold < price) {
            this.showNotification("Not enough gold!", "error");
            return;
        }
        
        // Deduct gold
        this.player.gold -= price;
        
        // Add item to inventory
        const itemDetails = {
            coffee: { name: "Coffee Potion", type: "consumable", effect: "+30min focus boost" },
            focus: { name: "Focus Scroll", type: "consumable", effect: "2x XP for 1 hour" },
            time: { name: "Time Stopper", type: "consumable", effect: "Freeze timer for 15min" }
        };
        
        this.addItemToInventory(itemDetails[item]);
        
        this.showNotification(`Purchased ${itemDetails[item].name} for ${price} Gold!`, "success");
        
        // Update shop display
        this.loadShop();
        this.updatePlayerStats();
    }
}

// Start the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.game = new StudyLegends();
});