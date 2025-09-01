class AuthManager {
  constructor(apiClient, storageManager) {
    this.api = apiClient;
    this.storage = storageManager;
    this.currentUser = null;
  }

  async login(email, password) {
    try {
      const response = await this.api.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      this.setAuthData(response);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  async register(userData) {
    try {
      const response = await this.api.post(API_ENDPOINTS.REGISTER, userData);
      this.setAuthData(response);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  setAuthData(authData) {
    this.currentUser = authData.user;
    this.api.setToken(authData.token);
    this.storage.setItem(STORAGE_KEYS.USER, authData);
  }

  logout() {
    this.currentUser = null;
    this.api.setToken(null);
    this.storage.removeItem(STORAGE_KEYS.USER);
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // Check if we have stored auth data
  loadStoredAuth() {
    const authData = this.storage.getItem(STORAGE_KEYS.USER);
    if (authData && authData.token) {
      this.currentUser = authData.user;
      this.api.setToken(authData.token);
      return true;
    }
    return false;
  }
}
