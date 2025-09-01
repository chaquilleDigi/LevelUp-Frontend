class StorageManager {
  constructor() {
    this.storage = window.localStorage;
  }

  getItem(key) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn(`Failed to get item ${key}:`, e);
      return null;
    }
  }

  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`Failed to set item ${key}:`, e);
      showToast("Failed to save data", "error");
      return false;
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (e) {
      console.warn(`Failed to remove item ${key}:`, e);
      return false;
    }
  }

  clear() {
    try {
      this.storage.clear();
      return true;
    } catch (e) {
      console.warn("Failed to clear storage:", e);
      return false;
    }
  }
}
