import { useState, useEffect } from "react";

export default function AnimatedWrapper({ isUnlocked, children }) {
  const [shouldRender, setShouldRender] = useState(!isUnlocked);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isUnlocked && shouldRender) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match the CSS animation duration
      return () => clearTimeout(timer);
    } else if (!isUnlocked) {
      setShouldRender(true);
      setIsExiting(false);
    }
  }, [isUnlocked, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className={`animated-wrapper ${isExiting ? 'animated-wrapper--exiting' : ''}`}
    >
      {children}
    </div>
  );
}
