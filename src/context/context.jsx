import { createContext, useContext, useState, useEffect } from "react";

// ---------------------
// Context with safe defaults
// ---------------------
const LocationContext = createContext({
  location: "Bogotá",
  setLocation: () => { },
  isOpen: false,
  open: () => { },
  close: () => { },
  storage: {},
  setLocalStorage: () => { },
  getLocalStorage: () => { },
  isUnlocked: false,
  setIsUnlocked: () => { },
});

export const LocationProvider = ({ children }) => {

  
  // ---------------------
  // Location state
  // ---------------------
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem("location");
    // Si no hay valor o es "null", usar string vacío
    if (!saved || saved === "null") return "Bogotá";
    return saved;
  });

  // ---------------------
  // Sync location with localStorage
  // ---------------------
  useEffect(() => {
    // Evitar guardar "null" o undefined
    const valueToSave = location && location !== "null" ? location : "";
    localStorage.setItem("location", valueToSave);
  }, [location]);


  // ---------------------
  // Products
  // ---------------------
  const [products, setProducts] = useState({});

  // ---------------------
  // Categories
  // ---------------------
  const [categories, setCategories] = useState([]);


  // ---------------------
  // Modal state
  // ---------------------
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // ---------------------
  // Storage state (all keys in one object)
  // ---------------------
  const [storage, setStorageState] = useState(() => {
    const initialStorage = {};
    const keys = ["swipeToEnterUnlocked"]; // add other keys here

    keys.forEach((key) => {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          // parse only if looks like JSON
          if (value.startsWith("{") || value.startsWith("[")) {
            initialStorage[key] = JSON.parse(value);
          } else {
            initialStorage[key] = value;
          }
        } else {
          // default values if key not in localStorage
          initialStorage[key] =
            key === "swipeToEnterUnlocked"
              ? { unlocked: false, timestamp: null }
              : null;
        }
      } catch {
        // fallback if invalid JSON
        initialStorage[key] =
          key === "swipeToEnterUnlocked"
            ? { unlocked: false, timestamp: null }
            : null;
      }
    });

    return initialStorage;
  });

  /**
   * Save one or more values to localStorage and sync state
   * Accepts object: { key1: value1, key2: value2 }
   */
  const setLocalStorage = (newValues) => {
    setStorageState((prev) => {
      const updated = { ...prev, ...newValues };
      Object.entries(newValues).forEach(([key, value]) => {
        try {
          if (value && typeof value === "object") {
            localStorage.setItem(key, JSON.stringify(value));
          } else {
            localStorage.setItem(key, value);
          }
        } catch (e) {
          console.warn(`Failed to save key "${key}" to localStorage`, e);
        }
      });
      return updated;
    });
  };

  /**
   * Get a value from storage state or localStorage
   */
  const getLocalStorage = (key) => {
    if (storage[key] !== undefined) return storage[key];
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      if (value.startsWith("{") || value.startsWith("[")) return JSON.parse(value);
      return value;
    } catch {
      return null;
    }
  };

  // ---------------------
  // AgeValidation state
  // ---------------------
  const [isUnlocked, setIsUnlocked] = useState(() => {
    let saved;
    try {
      saved = getLocalStorage("swipeToEnterUnlocked");
    } catch {
      saved = null;
    }

    const now = Date.now();
    const expireTime = 900 * 1000; // 900 segundos por defecto

    if (!saved || !saved.unlocked || now - saved.timestamp >= expireTime) {
      setLocalStorage({ swipeToEnterUnlocked: { unlocked: false, timestamp: null } });
      return false;
    }

    return true;
  });
  const unlockSwipe = () => {
    const value = { unlocked: true, timestamp: Date.now() };
    setLocalStorage({ swipeToEnterUnlocked: value });
    setIsUnlocked(true);
  };


  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        isOpen,
        open,
        close,
        storage,
        setLocalStorage,
        getLocalStorage,
        isUnlocked,
        unlockSwipe,
        products,
        setProducts,
        categories,
        setCategories,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Hook to consume context
export const useLocation = () => useContext(LocationContext);
