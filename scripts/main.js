// Main application initialization
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize managers
  const storageManager = new StorageManager();
  const apiClient = new ApiClient('http://localhost:5000'); // Update with your backend URL
  const authManager = new AuthManager(apiClient, storageManager);
  const skillsManager = new SkillsManager(apiClient, storageManager);
  
  // Try to load stored authentication
  if (authManager.loadStoredAuth()) {
    try {
      await skillsManager.fetchUserSkills();
    } catch (error) {
      console.warn('Failed to fetch user skills, using local data:', error);
      skillsManager.initializeDefaults();
    }
  } else {
    skillsManager.initializeDefaults();
  }
  
  // Initialize UI
  const uiManager = new UIManager(skillsManager, authManager);
  
  // Fetch all skills if authenticated
  if (authManager.isAuthenticated()) {
    try {
      await skillsManager.fetchAllSkills();
      uiManager.updateUserInfo();
    } catch (error) {
      console.warn('Failed to fetch skills:', error);
    }
  }
  
  // Initial UI update
  uiManager.updateUI();
});
