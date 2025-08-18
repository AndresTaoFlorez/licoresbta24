import { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import './SwipeToEnter.scss';
import Slider from '../../components/components/Slider/index.jsx';

const getInitialUnlockedState = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('swipeToEnterUnlocked') === 'true';
  }
  return false;
};

export default function SwipeToEnter({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(getInitialUnlockedState);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slideComplete, setSlideComplete] = useState(false);
  const [isContracting, setIsContracting] = useState(false);

  const sliderRef = useRef(null);
  const buttonRef = useRef(null);
  const progressBarRef = useRef(null);

  const dragRef = useRef({
    startX: 0,
    baseX: 0,
    currentX: 0,
    maxMove: 0,
    leftOffset: 0
  });

  const pxFromRem = (rem) =>
    rem * parseFloat(getComputedStyle(document.documentElement).fontSize || '16');

  const updateProgress = (x) => {
    const pct = Math.min((x / Math.max(dragRef.current.maxMove, 1)) * 100, 100);
    setProgress(pct);
    return pct;
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('swipeToEnterUnlocked', 'true');
    }
  };

  const handlePointerDown = (e) => {
    if (!sliderRef.current || !buttonRef.current) return;

    setIsDragging(true);

    // Capturamos el puntero para que el drag sea 1 solo toque/click
    buttonRef.current.setPointerCapture?.(e.pointerId);

    // Sin transición mientras se arrastra
    buttonRef.current.style.transition = 'none';

    // Posiciones y límites
    const sliderWidth = sliderRef.current.offsetWidth;
    const buttonWidth = buttonRef.current.offsetWidth;

    // Offset izquierdo existente (viene del CSS)
    const leftOffset = buttonRef.current.offsetLeft;

    // Margen derecho requerido
    const rightMargin = pxFromRem(0.4);

    // Movimiento máximo
    const maxMove = Math.max(sliderWidth - buttonWidth - rightMargin - leftOffset, 0);

    // translateX actual
    const currentVar = getComputedStyle(buttonRef.current).getPropertyValue('--x').trim();
    const baseX = Number.parseFloat(currentVar) || 0;

    dragRef.current.startX = e.clientX;
    dragRef.current.baseX = baseX;
    dragRef.current.currentX = baseX;
    dragRef.current.maxMove = maxMove;
    dragRef.current.leftOffset = leftOffset;

    e.preventDefault();
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !buttonRef.current) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const rawX = dragRef.current.baseX + deltaX;

    // Clamp entre 0 y maxMove
    const x = Math.max(0, Math.min(rawX, dragRef.current.maxMove));

    dragRef.current.currentX = x;
    buttonRef.current.style.setProperty('--x', `${x}px`);

    updateProgress(x);

    e.preventDefault();
  };

  const handlePointerUp = (e) => {
    if (!buttonRef.current) return;

    setIsDragging(false);

    // Activar transición SOLO al soltar
    buttonRef.current.style.transition = 'transform 0.2s ease';

    const { currentX, maxMove } = dragRef.current;

    // Validación SOLO si está al final y se suelta
    if (currentX >= maxMove) {
      setSlideComplete(true);
      buttonRef.current.style.setProperty('--x', `${maxMove}px`);
      setProgress(100);

      // Agregar clase is-complete a la barra de progreso
      if (progressBarRef.current) {
        progressBarRef.current.classList.add('is-complete');
      }

      // Iniciar secuencia de animaciones
      setTimeout(() => {
        setIsContracting(true);
        if (sliderRef.current) {
          sliderRef.current.classList.add('contract');
        }
      }, 800); // Tiempo para ver la iluminación

      // Desbloquear después de la animación completa
      setTimeout(() => {
        handleUnlock();
      }, 1600); // Tiempo total de animación
    } else {
      // Volver a inicio
      buttonRef.current.style.setProperty('--x', '0px');
      setProgress(0);
      setSlideComplete(false);

      // Remover clase is-complete de la barra de progreso
      if (progressBarRef.current) {
        progressBarRef.current.classList.remove('is-complete');
      }
    }

    buttonRef.current.releasePointerCapture?.(e.pointerId);
  };

  // Si está desbloqueado, mostrar el contenido
  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="SwipeToEnter">
      <div className="SwipeToEnter__background">
        <div className="sphere sphere--white"></div>
        <div className="sphere sphere--green-light"></div>
        <div className="sphere sphere--emerald"></div>
        <div className="sphere sphere--white-dim"></div>
        <div className="sphere sphere--center"></div>
      </div>

      <div className="SwipeToEnter__content">
        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 w-full max-w-md border border-emerald-400/30 shadow-2xl">
          <div className='text-center mb-6 sm:mb-8'>
            <div className="logo w-80 h-45 mx-auto bg-gradient-to-r rounded-full flex items-center justify-center mb-14 mt-10">
              <img src="/licoresbta_logo.svg" alt="Licores Bogotá 24" />
            </div>

            <h1 className='text-2xl sm:text-3xl font-bold text-white mb-3'>Soy mayor de 18 años</h1>
            <p className='text-emerald-100/90 text-sm sm:text-base leading-relaxed'>
              Desliza si eres mayor de edad. Al ingresar autorizas el tratamiento de
              datos personales y los términos y condiciones.
            </p>
          </div>

          {/* Slider */}
          <Slider onConfirm={() => setIsUnlocked(true)} />

          <div className="mt-4 p-3 bg-black/20 rounded-lg border border-emerald-500/20">
            <p className='text-emerald-200/60 text-xs leading-relaxed'>
              ⚠️ Este sitio contiene información sobre bebidas alcohólicas. Solo
              para mayores de 18 años. El consumo excesivo de alcohol es perjudicial
              para la salud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}