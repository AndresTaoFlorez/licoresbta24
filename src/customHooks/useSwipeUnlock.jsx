import { useLocation } from "../context/context.jsx";
import { useState } from "react";

const { getLocalStorage, setLocalStorage } = useLocation();

const getInitialUnlocked = () => {
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
};

const [isUnlocked, setIsUnlocked] = useState(getInitialUnlocked);
