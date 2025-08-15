import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

// Función para leer localStorage de forma síncrona
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
  const sliderRef = useRef(null);
  const buttonRef = useRef(null);
  const dragDataRef = useRef({
    startX: 0,
    currentX: 0,
    maxMove: 0
  });

  const handleUnlock = () => {
    setIsUnlocked(true);
    localStorage.setItem('swipeToEnterUnlocked', 'true');
  };

  const updateProgress = (position) => {
    const progressPercent = Math.min((position / dragDataRef.current.maxMove) * 100, 100);
    setProgress(progressPercent);
    return progressPercent;
  };

  const handleStart = (e) => {
    if (!sliderRef.current || !buttonRef.current) return;
    
    setIsDragging(true);
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    
    // Calcular el espacio máximo de movimiento
    dragDataRef.current.maxMove = sliderRef.current.offsetWidth - buttonRef.current.offsetWidth - 8;
    dragDataRef.current.startX = clientX;
    dragDataRef.current.currentX = 0;
    
    // Remover transición para movimiento suave
    buttonRef.current.style.transition = 'none';
    
    e.preventDefault();
  };

  const handleMove = (e) => {
    if (!isDragging || !buttonRef.current) return;
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const deltaX = clientX - dragDataRef.current.startX;
    
    // Limitar el movimiento dentro del contenedor
    dragDataRef.current.currentX = Math.max(0, Math.min(deltaX, dragDataRef.current.maxMove));
    
    // Aplicar transformación
    buttonRef.current.style.transform = `translateX(${dragDataRef.current.currentX}px)`;
    
    // Actualizar progreso
    const currentProgress = updateProgress(dragDataRef.current.currentX);
    
    // Verificar si llegó al final (90% del recorrido)
    if (currentProgress >= 90) {
      handleUnlock();
      return;
    }
    
    e.preventDefault();
  };

  const handleEnd = () => {
    if (!isDragging || !buttonRef.current) return;
    
    setIsDragging(false);
    
    const currentProgress = updateProgress(dragDataRef.current.currentX);
    
    if (currentProgress < 90) {
      // No llegó al final, regresar al inicio con animación
      buttonRef.current.style.transition = 'transform 0.3s ease-out';
      buttonRef.current.style.transform = 'translateX(0px)';
      
      // Resetear progreso después de la animación
      setTimeout(() => {
        setProgress(0);
        dragDataRef.current.currentX = 0;
      }, 300);
    }
  };

  // Event listeners usando eventos nativos
  const handleMouseDown = (e) => {
    handleStart(e);
    
    const handleMouseMove = (e) => handleMove(e);
    const handleMouseUp = () => {
      handleEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    handleStart(e);
    
    const handleTouchMove = (e) => handleMove(e);
    const handleTouchEnd = () => {
      handleEnd();
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Si está desbloqueado, mostrar el contenido children
  if (isUnlocked) {
    return <>{children}</>;
  }

  // Pantalla de swipe responsiva
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo con esferas blur */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#468553] to-[#1F2B08]"> */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#33623d] to-[#141b05]">
        {/* Esferas decorativas con blur */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-emerald-400/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-200/5 rounded-full blur-3xl"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 w-full max-w-md border border-emerald-400/30 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <div className="mb-4">
              {/* Logo licoresbta24*/}
              <div className="w-40 h-40 mx-auto bg-gradient-to-r rounded-full flex items-center justify-center mb-4">
                <img src="/licoresbta_logo.svg" alt="Licores Bogotá 24" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Soy mayor de 18 años</h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Desliza si eres mayor de edad. Al ingresar autorizas el tratamiento de datos personales y los términos y condiciones.
            </p>
          </div>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="relative bg-black/30 rounded-full h-14 sm:h-16 border-2 border-emerald-400/40 overflow-hidden mb-4 sm:mb-6 select-none shadow-inner"
          >
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-emerald-200/70 font-medium select-none text-sm sm:text-base">
                Desliza para confirmar →
              </span>
            </div>

            {/* Draggable Button */}
            <div
              ref={buttonRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className={`absolute top-1 left-1 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-transform ${
                isDragging ? 'scale-110' : 'scale-100 hover:scale-105'
              } touch-manipulation select-none`}
              style={{ willChange: 'transform' }}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-black/30 rounded-full h-2 mb-6">
            <div
              className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-center">
            <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed mb-3">
              Confirma que eres mayor de edad para acceder al contenido
            </p>
            {isDragging && (
              <p className="text-emerald-300/90 text-xs font-medium">
                {Math.round(progress)}% completado
              </p>
            )}
            
            {/* Advertencia legal */}
            <div className="mt-4 p-3 bg-black/20 rounded-lg border border-emerald-500/20">
              <p className="text-emerald-200/60 text-xs leading-relaxed">
                ⚠️ Este sitio contiene información sobre bebidas alcohólicas. Solo para mayores de 18 años. El consumo excesivo de alcohol es perjudicial para la salud.
              </p>
            </div>
          </div>

          {/* Botón de desarrollo para testing */}
          {/* {process.env.NODE_ENV === 'development' && (
            <div className="text-center mt-4">
              <button
                onClick={handleUnlock}
                className="text-emerald-400/40 text-xs hover:text-emerald-300/70 transition-colors"
              >
                (Dev: Click para desbloquear)
              </button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}