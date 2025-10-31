import { useDispatch, useSelector } from "react-redux";
import Slider from "../../../shared/components/Slider.jsx";
import AnimatedWrapper from "../../../shared/components/AnimatedWrapper.jsx";
import BackgroundEffects from "../../../shared/components/BackgroundEffects.jsx";
import { setUnlocked } from "../../../store/slices/uiSlice.js";
import "../../../shared/styles/swipeToEnter.scss";

export default function SwipeToEnter({ children, loading }) {
  const dispatch = useDispatch();
  const isUnlocked = useSelector((state) => state.ui.isUnlocked);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
      </div>
    );
  }

  const handleUnlock = () => {
    dispatch(setUnlocked(true));
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full">
      {/* BackgroundEffects visible en ambas fases */}
      <BackgroundEffects />

      <AnimatedWrapper isUnlocked={isUnlocked}>
        {/*// swiper*/}
        <div className="SwipeToEnter">
          <div className="SwipeToEnter__content">
            <div className="card">
              <div className="card__header">
                <div className="logo">
                  <img
                    src="/licoresbta_logo.svg"
                    alt="Licores Bogotá 24"
                  />
                </div>

                <h1>Soy mayor de 18 años</h1>
                <p>
                  Desliza si eres mayor de edad. Al ingresar autorizas el
                  tratamiento de datos personales y los términos y condiciones.
                </p>
              </div>

              <div className="card__slider">
                <Slider onConfirm={handleUnlock} />
              </div>

              <div className="card__warning">
                <p>
                  ⚠️ Este sitio contiene información sobre bebidas alcohólicas. Solo
                  para mayores de 18 años. El consumo excesivo de alcohol es
                  perjudicial para la salud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedWrapper>
      {/* Content - solo se renderiza cuando está desbloqueado */}
      {isUnlocked && children}
    </div>
  );
}


