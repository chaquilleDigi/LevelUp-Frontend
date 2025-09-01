class UIManager {
  constructor(skillsManager, authManager) {
    this.skillsManager = skillsManager;
    this.authManager = authManager;
    this.modal = document.getElementById('skill-modal');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Skill tree node clicks
    document.querySelector(".skill-tree").addEventListener("click", (e) => {
      const node = e.target.closest(".node");
      if (!node) return;
      
      this.handleSkillNodeClick(node);
    });

    // Modal events
    document.querySelector('.modal-close').addEventListener('click', () => {
      this.hideModal();
    });

    document.getElementById('modal-submit').addEventListener('click', () => {
      this.handleAnswerSubmission();
    });

    document.getElementById('modal-answer').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleAnswerSubmission();
      }
    });

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.hideModal();
      }
    });

    // Quick actions
    document.querySelectorAll('[data-action]').forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleQuickAction(action);
      });
    });
  }

  handleSkillNodeClick(node) {
    const skillName = node.dataset.skill;
    
    if (this.skillsManager.unlockedSkills.includes(skillName)) {
      showToast(`You have already unlocked ${skillName}!`, "info");
      return;
    }

    const prereqMet = this.skillsManager.checkPrerequisites(skillName);
    if (!prereqMet) {
      const prereq = SKILL_CONFIG[skillName].prereq.join(" and ");
      showToast(`You must unlock ${prereq} first.`, "error");
      return;
    }

    this.showSkillModal(skillName);
  }

  showSkillModal(skillName) {
    this.skillsManager.activeSkill = skillName;
    document.getElementById('modal-skill-title').textContent = skillName;
    document.getElementById('modal-skill-desc').textContent = SKILL_CONFIG[skillName].description;
    document.getElementById('modal-question').textContent = SKILL_CONFIG[skillName].question;
    document.getElementById('modal-answer').value = '';
    document.getElementById('modal-feedback').textContent = '';
    
    this.modal.classList.add("show");
    document.getElementById('modal-answer').focus();
  }

  hideModal() {
    this.modal.classList.remove("show");
  }

  async handleAnswerSubmission() {
    const userAnswer = document.getElementById('modal-answer').value.trim().toLowerCase();
    const skillName = this.skillsManager.activeSkill;
    const correctAnswers = SKILL_CONFIG[skillName].answer.map(a => a.toLowerCase());

    if (correctAnswers.includes(userAnswer)) {
      try {
        // If authenticated, try to unlock on server
        if (this.authManager.isAuthenticated()) {
          const skill = this.skillsManager.allSkills.find(s => s.name === skillName);
          if (skill) {
            await this.skillsManager.unlockSkillOnServer(skill._id, userAnswer);
          }
        } else {
          // Local only
          this.skillsManager.unlockSkill(skillName);
        }
        
        this.updateUI();
        showToast(`Congratulations! You unlocked ${skillName}!`, "success");
        
        // Add new activity log entry
        this.addActivityLog(`Unlocked ${skillName}`);
        
        this.hideModal();
      } catch (error) {
        showToast(error.message || "Failed to unlock skill", "error");
      }
    } else {
      document.getElementById('modal-feedback').textContent = "Incorrect. Please try again.";
      document.getElementById('modal-feedback').style.color = "var(--danger)";
    }
  }

  updateUI() {
    this.updateSkillNodes();
    this.updateSkillCards();
    this.updateProgress();
  }

  updateSkillNodes() {
    const nodes = document.querySelectorAll('.skill-tree .node');
    
    nodes.forEach(node => {
      const skillName = node.dataset.skill;
      
      if (this.skillsManager.unlockedSkills.includes(skillName)) {
        node.classList.add('unlocked');
        node.classList.remove('locked');
      } else {
        node.classList.add('locked');
        node.classList.remove('unlocked');
      }
    });
  }

  updateSkillCards() {
    const cards = document.querySelectorAll('.skill-card');
    
    cards.forEach(card => {
      const skillName = card.querySelector('h4').textContent;
      const progressBar = card.querySelector('.fill');
      const skillLevel = card.querySelector('.skill-level');
      
      if (this.skillsManager.unlockedSkills.includes(skillName)) {
        progressBar.style.width = '100%';
        skillLevel.textContent = 'Unlocked';
      } else {
        progressBar.style.width = '0%';
        skillLevel.textContent = 'Locked';
      }
    });
  }

  updateProgress() {
    const progressFill = document.querySelector(".progress-bar .fill");
    const progressText = document.getElementById("progress-text");
    const unlockedCount = document.getElementById("unlocked-count");
    
    const percentage = this.skillsManager.getProgress();
    const unlockedCountNum = this.skillsManager.unlockedSkills.length;
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Complete`;
    unlockedCount.textContent = unlockedCountNum;
    
    // Update aria attributes
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', percentage);
    }
  }

  addActivityLog(message) {
    const activityList = document.querySelector(".recent-activity ul");
    const newActivity = document.createElement("li");
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    newActivity.innerHTML = `${message} <span class="timestamp">at ${timestamp}</span>`;
    activityList.prepend(newActivity);
  }

  handleQuickAction(action) {
    switch(action) {
      case 'skills':
        showToast('Edit Skills feature coming soon!', 'info');
        break;
      case 'profile':
        showToast('Update Profile feature coming soon!', 'info');
        break;
      case 'export':
        showToast('Export PDF feature coming soon!', 'info');
        break;
      case 'check':
        showToast('Running resume check...', 'info');
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  updateUserInfo() {
    if (this.authManager.isAuthenticated()) {
      const user = this.authManager.getCurrentUser();
      document.querySelector('.welcome h2').textContent = `Hey ${user.firstName}, ready to level up?`;
    }
  }
}
