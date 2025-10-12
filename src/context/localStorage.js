
// setLocalStorage({ theme: "dark" });
// localStorage => { theme: "dark" }
// storageState => { theme: "dark" }


/**
   * Save one or more values to localStorage and sync state
   * Accepts object: { key1: value1, key2: value2 }
   * @param {Object} newValues - Object with key-value pairs to save - plain JavaScript object
   */
const setLocalStorage = (newValues) => {
    Object.entries(newValues).forEach(([key, value]) => {
        try {
            if (value !== null && value !== undefined && typeof value === "object") {
                localStorage.setItem(key, JSON.stringify(value));
            } else if (value === null || value === undefined) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, String(value));
            }
        } catch (e) {
            console.warn(`Failed to save key "${key}" to localStorage`, e);
        }
    });
};

// getLocalStorage("theme");
// "dark"
/**
 * Get a value from storage state or localStorage
 * @param {string} key - The key to retrieve
 * @returns {*} The stored value or null if not found
 */
const getLocalStorage = (key) => {
    try {
        const value = localStorage.getItem(key);
        if (value === null || value === undefined) return null;

        if (
            (value.startsWith("{") && value.endsWith("}")) ||
            (value.startsWith("[") && value.endsWith("]"))
        ) {
            console.log("value before parse ", typeof value)
            return JSON.parse(value);
        }

        return value;
    } catch (error) {
        console.warn(`Failed to get key "${key}" from localStorage`, error);
        return null;
    }
};


export { getLocalStorage, setLocalStorage }
