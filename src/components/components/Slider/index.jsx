import { useState, useRef, useCallback } from "react";
import { ChevronRight } from "lucide-react";

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
      localStorage.setItem('swipeToEnterUnlocked', 'true');
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
    <div className="w-full flex justify-center items-center min-h-[100px]">
      <div
        ref={sliderRef}
        className={`
          relative rounded-full select-none flex items-center
          transition-all ease-in-out duration-500
          ${slideComplete 
            ? 'bg-emerald-900 border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
            : 'bg-black/30 border-2 border-emerald-400/40 shadow-inner'
          }
        `}
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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span 
            className="font-medium select-none text-base transition-all duration-300 ml-6"
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
          className={`
            rounded-full flex items-center justify-center select-none
            bg-gradient-to-br from-emerald-500 to-emerald-600
            shadow-[0_4px_12px_rgba(16,185,129,0.3)]
            transition-all ease-out duration-500 touch-none
            ${isDragging ? 'cursor-grabbing shadow-[0_6px_16px_rgba(16,185,129,0.4)]' : 'cursor-grab'}
            flex-shrink-0
          `}
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
            className="w-5 h-5 text-white transition-all duration-300 ease-in-out"
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