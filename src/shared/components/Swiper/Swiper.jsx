import { useState, useEffect } from "react";
import { Slider } from "../index.js";
import "./Swiper.scss";

export default function Swiper({ isUnlocked, onUnlock }) {
  const [shouldRender, setShouldRender] = useState(!isUnlocked);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isUnlocked && shouldRender) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600); // Match the CSS animation duration
      return () => clearTimeout(timer);
    } else if (!isUnlocked) {
      setShouldRender(true);
      setIsExiting(false);
    }
  }, [isUnlocked, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className={`swiper ${isExiting ? 'swiper--exiting' : ''}`}>
      <div className="swiper__content">
        <div className="swiper__card">
          <div className="swiper__header">
            <div className="swiper__logo">
              <img
                src="/licoresbta_logo.svg"
                alt="Licores Bogotá 24"
              />
            </div>

            <h1 className="swiper__title">Soy mayor de 18 años</h1>
            <p className="swiper__description">
              Desliza si eres mayor de edad. Al ingresar autorizas el
              tratamiento de datos personales y los términos y condiciones.
            </p>
          </div>

          <div className="swiper__slider">
            <Slider onConfirm={onUnlock} />
          </div>

          <div className="swiper__warning">
            <p>
              ⚠️ Este sitio contiene información sobre bebidas alcohólicas. Solo
              para mayores de 18 años. El consumo excesivo de alcohol es
              perjudicial para la salud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
