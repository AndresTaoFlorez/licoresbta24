import { useState, useRef, useCallback } from "react";
import { ChevronRight } from "../icons/index.jsx";
import "./Slider.scss";

export default function Slider({ onConfirm, text = "Desliza para confirmar →" }) {
  const [slideComplete, setSlideComplete] = useState(false);
  const [isContracting, setIsContracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDisappearing, setIsDisappearing] = useState(false);

  const sliderRef = useRef(null);
  const buttonRef = useRef(null);
  const startXRef = useRef(0);

  const BUTTON_SIZE = 56;
  const MARGIN = 4;
  const SLIDER_HEIGHT = 64;

  const getMaxDrag = () => {
    if (!sliderRef.current) return 280;
    const sliderWidth = sliderRef.current.offsetWidth;
    return sliderWidth - BUTTON_SIZE - (MARGIN * 2);
  };

  const handlePointerDown = useCallback((e) => {
    if (slideComplete) return;

    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX - dragX;

    if (buttonRef.current) {
      buttonRef.current.setPointerCapture(e.pointerId);
    }
  }, [dragX, slideComplete]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging || slideComplete) return;

    const maxDrag = getMaxDrag();
    const currentX = e.clientX - startXRef.current;
    const clampedX = Math.max(0, Math.min(currentX, maxDrag));

    setDragX(clampedX);
  }, [isDragging, slideComplete]);

  const handlePointerUp = useCallback((e) => {
    if (!isDragging) return;

    setIsDragging(false);
    const maxDrag = getMaxDrag();

    if (buttonRef.current) {
      buttonRef.current.releasePointerCapture(e.pointerId);
    }

    if (dragX > maxDrag * 0.75) {
      // COMPLETADO
      setSlideComplete(true);
      setDragX(maxDrag);

      // Secuencia de animaciones
      setTimeout(() => {
        setIsContracting(true);
      }, 200);

      setTimeout(() => {
        setIsDisappearing(true);
      }, 550);

      setTimeout(() => {
        onConfirm?.();
      }, 600);
    } else {
      // NO COMPLETADO - regresar al origen
      setDragX(0);
    }
  }, [isDragging, dragX, onConfirm]);

  const maxDrag = getMaxDrag();
  const progress = maxDrag > 0 ? dragX / maxDrag : 0;
  const textOpacity = slideComplete ? 0 : Math.max(0.1, 1 - progress * 1.5);

  return (
    <div className="slider-container">
      <div
        ref={sliderRef}
        className={`slider-track ${slideComplete ? 'slider-track--complete' : 'slider-track--default'}`}
        style={{
          width: isContracting ? `${BUTTON_SIZE + (MARGIN * 2)}px` : '350px',
          height: `${SLIDER_HEIGHT}px`,
          opacity: isDisappearing ? 0 : 1,
          transform: isDisappearing ? 'translateY(32px) scale(0.8)' : 'translateY(0) scale(1)',
          paddingLeft: `${MARGIN}px`,
          paddingRight: `${MARGIN}px`,
          justifyContent: isContracting ? 'center' : 'flex-start',
        }}
      >
        {/* Text */}
        <div className="slider-text-container">
          <span
            className="slider-text"
            style={{
              opacity: textOpacity,
              color: slideComplete ? '#34d399' : 'rgba(167, 243, 208, 0.7)'
            }}
          >
            {slideComplete ? '✓ Confirmado' : text}
          </span>
        </div>


        {/* Button - usando solo flexbox */}
        <div
          ref={buttonRef}
          className={`slider-button ${isDragging ? 'slider-button--dragging' : 'slider-button--idle'}`}
          style={{
            width: isDisappearing ? '20px' : `${BUTTON_SIZE}px`,
            height: isDisappearing ? '20px' : `${BUTTON_SIZE}px`,
            marginLeft: isContracting ? '0px' : `${dragX}px`,
            transitionProperty: isDisappearing ? 'width, height' : isDragging ? 'none' : 'margin-left',
            transitionDuration: isDisappearing ? '500ms' : isDragging ? '0ms' : '400ms',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <ChevronRight
            style={{
              opacity: slideComplete ? 0 : 1,
              transform: slideComplete ? 'scale(0)' : 'scale(1)'
            }}
          />
        </div>
      </div>
    </div>
  );
}