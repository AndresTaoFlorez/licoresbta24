import { createContext, useContext, useState, useEffect } from "react";
import { setLocalStorage, getLocalStorage } from "./localStorage.js"
import { getProducts } from "../features/products/services/products";

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
    const saved = getLocalStorage("location");
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
    // localStorage.setItem("location", valueToSave);
    setLocalStorage({ location: valueToSave })
  }, [location]);


  // ---------------------
  // Filtered Products
  // ---------------------
  const [filteredProducts, setFilteredProducts] = useState([]);


  // ---------------------
  // Products
  // ---------------------
  const [products, setProducts] = useState([]);

  // ---------------------
  // Categories
  // ---------------------
  const [category, setCategory] = useState("");

  useEffect(() => {
    setFilteredProducts(() => {
      if (!products) return [];
      if (!category) return products;
      return Object.values(products).filter(p => p.CATEGORIA.toLowerCase() === category.toLowerCase());
    })
  }, [category]);

  // ---------------------
  // Loading state
  // ---------------------
  const [loading, setLoading] = useState(false);

  // ---------------------
  // Modal state
  // ---------------------
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // ---------------------
  // Storage state (all keys in one object) - FIXED
  // ---------------------
  const [storage, setStorageState] = useState(() => {
    const initialStorage = {};
    const keys = ["swipeToEnterUnlocked"]; // add other keys here

    keys.forEach((key) => {
      const value = getLocalStorage(key);

      if (value !== null && value !== undefined) {
        initialStorage[key] = value;
      } else {
        // Default values per key
        initialStorage[key] =
          key === "swipeToEnterUnlocked"
            ? { unlocked: false, timestamp: null }
            : null;
      }
    });

    return initialStorage;
  });

  // handleLocalStorage
  //  ...


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

  // ---------------------
  // Load Data
  // ---------------------
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    open();
    fetchProducts();
    setLoading(false);
  }, []);


  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        isOpen,
        open,
        close,
        storage,
        isUnlocked,
        unlockSwipe,
        products,
        setProducts,
        category,
        setCategory,
        filteredProducts,
        setFilteredProducts,
        loading,
        setLoading
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Hook to consume context
export const useAppContext = () => useContext(LocationContext);
