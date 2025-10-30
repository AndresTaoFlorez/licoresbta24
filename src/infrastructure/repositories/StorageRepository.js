/**
 * StorageRepository - Centralized localStorage management
 * Consolidates all localStorage operations with consistent error handling
 */

class StorageRepository {
  /**
   * Save a value to localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON.stringified if object)
   */
  save(key, value) {
    try {
      if (value === null || value === undefined) {
        this.remove(key);
        return;
      }

      if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, String(value));
      }
    } catch (error) {
      console.error(`Failed to save key "${key}" to localStorage:`, error);
    }
  }

  /**
   * Save multiple key-value pairs
   * @param {Object} entries - Object with key-value pairs
   */
  saveMultiple(entries) {
    Object.entries(entries).forEach(([key, value]) => {
      this.save(key, value);
    });
  }

  /**
   * Load a value from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Stored value or defaultValue
   */
  load(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);

      if (value === null || value === undefined) {
        return defaultValue;
      }

      // Try to parse as JSON
      if (
        (value.startsWith('{') && value.endsWith('}')) ||
        (value.startsWith('[') && value.endsWith(']'))
      ) {
        return JSON.parse(value);
      }

      return value;
    } catch (error) {
      console.error(`Failed to load key "${key}" from localStorage:`, error);
      return defaultValue;
    }
  }

  /**
   * Load value with expiration check
   * @param {string} key - Storage key
   * @param {number} maxAge - Maximum age in milliseconds
   * @param {*} defaultValue - Default value if expired or doesn't exist
   * @returns {*} Stored value or defaultValue
   */
  loadWithExpiration(key, maxAge, defaultValue = null) {
    try {
      const stored = this.load(key);

      if (!stored || typeof stored !== 'object' || !stored.timestamp) {
        return defaultValue;
      }

      const now = Date.now();
      const age = now - stored.timestamp;

      if (age >= maxAge) {
        // Expired, remove it
        this.remove(key);
        return defaultValue;
      }

      return stored;
    } catch (error) {
      console.error(`Failed to load key "${key}" with expiration:`, error);
      return defaultValue;
    }
  }

  /**
   * Check if a stored value with timestamp is still valid
   * @param {string} key - Storage key
   * @param {number} maxAge - Maximum age in milliseconds
   * @returns {boolean} True if valid, false if expired or doesn't exist
   */
  isValid(key, maxAge) {
    const stored = this.loadWithExpiration(key, maxAge, null);
    return stored !== null;
  }

  /**
   * Remove a value from localStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove key "${key}" from localStorage:`, error);
    }
  }

  /**
   * Clear all localStorage
   */
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}

// Export singleton instance
export const storageRepository = new StorageRepository();
