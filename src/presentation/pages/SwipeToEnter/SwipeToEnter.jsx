import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper } from "../../../shared/components";
import { BackgroundEffects } from "../../components/layout";
import { setUnlocked } from "../../../infrastructure/state/slices/uiSlice.js";
import "./SwipeToEnter.scss";

export default function SwipeToEnter({ children, loading }) {
  const dispatch = useDispatch();
  const isUnlocked = useSelector((state) => state.ui.isUnlocked);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isUnlocked) {
      // Esperar a que el Swiper termine su animación (600ms) + un pequeño delay
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isUnlocked]);

  if (loading) {
    return (
      <div className="swipe-to-enter-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleUnlock = () => {
    dispatch(setUnlocked(true));
  };

  return (
    <div className="swipe-to-enter-container">
      {/* BackgroundEffects visible en ambas fases */}
      <BackgroundEffects />

      <Swiper isUnlocked={isUnlocked} onUnlock={handleUnlock} />

      {/* Content - se muestra con fade in después que el Swiper desaparezca */}
      {showContent && (
        <div className="content-wrapper content-wrapper--fade-in">
          {children}
        </div>
      )}
    </div>
  );
}


