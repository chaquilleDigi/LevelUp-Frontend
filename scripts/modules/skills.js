class SkillsManager {
  constructor(apiClient, storageManager) {
    this.api = apiClient;
    this.storage = storageManager;
    this.unlockedSkills = this.loadUnlocked();
    this.activeSkill = null;
    this.allSkills = [];
  }

  loadUnlocked() {
    try {
      const raw = this.storage.getItem(STORAGE_KEYS.SKILLS);
      return raw || [];
    } catch (e) {
      console.warn("Failed to load progress:", e);
      return [];
    }
  }

  saveUnlocked() {
    try {
      this.storage.setItem(STORAGE_KEYS.SKILLS, this.unlockedSkills);
      return true;
    } catch (e) {
      console.warn("Failed to save progress:", e);
      showToast("Failed to save progress", "error");
      return false;
    }
  }

  initializeDefaults() {
    Object.keys(SKILL_CONFIG).forEach((skill) => {
      if (SKILL_CONFIG[skill].unlockedByDefault && !this.unlockedSkills.includes(skill)) {
        this.unlockedSkills.push(skill);
      }
    });
    this.saveUnlocked();
  }

  checkPrerequisites(skillName) {
    return SKILL_CONFIG[skillName].prereq.every(prereq => 
      this.unlockedSkills.includes(prereq)
    );
  }

  unlockSkill(skillName) {
    if (!this.unlockedSkills.includes(skillName)) {
      this.unlockedSkills.push(skillName);
      this.saveUnlocked();
      return true;
    }
    return false;
  }

  getProgress() {
    const totalSkills = Object.keys(SKILL_CONFIG).length;
    const unlockedCount = this.unlockedSkills.length;
    return Math.round((unlockedCount / totalSkills) * 100);
  }

  async fetchAllSkills() {
    try {
      this.allSkills = await this.api.get(API_ENDPOINTS.SKILLS);
      return this.allSkills;
    } catch (error) {
      console.error('Failed to fetch skills:', error);
      // Fallback to local config
      return Object.keys(SKILL_CONFIG).map(key => ({
        name: key,
        ...SKILL_CONFIG[key]
      }));
    }
  }

  async fetchUserSkills() {
    try {
      const userSkills = await this.api.get(API_ENDPOINTS.USER_SKILLS);
      // Update unlocked skills based on server response
      this.unlockedSkills = userSkills
        .filter(skill => skill.unlocked)
        .map(skill => skill.skill.name);
      
      this.saveUnlocked();
      return userSkills;
    } catch (error) {
      console.error('Failed to fetch user skills:', error);
      return [];
    }
  }

  async unlockSkillOnServer(skillId, answer) {
    try {
      const endpoint = API_ENDPOINTS.UNLOCK_SKILL.replace(':skillId', skillId);
      const result = await this.api.post(endpoint, { answer });
      
      if (result.unlocked) {
        this.unlockSkill(result.skill.name);
      }
      
      return result;
    } catch (error) {
      console.error('Failed to unlock skill:', error);
      throw error;
    }
  }
}
