import Slider from "../../../shared/components/Slider.jsx";
import AnimatedWrapper from "../../../shared/components/AnimatedWrapper.jsx";
import { useAppContext } from "../../../context/AppContext.jsx";
import "../../../shared/styles/swipeToEnter.scss";

export default function SwipeToEnter({ children, loading }) {
  // usamos el custom hook
  const { isUnlocked, unlockSwipe } = useAppContext()


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
      </div>
    );
  }

  const handleUnlock = () => {
    unlockSwipe();
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-[#2b5e2c]">
      <AnimatedWrapper isUnlocked={isUnlocked}>
        {/*// swiper*/}
        <div className="SwipeToEnter flex flex-col h-screen ">
          <div className="SwipeToEnter__background">
            <div className="sphere sphere--white"></div>
            <div className="sphere sphere--green-light"></div>
            <div className="sphere sphere--emerald"></div>
            <div className="sphere sphere--white-dim"></div>
            <div className="sphere sphere--center"></div>
          </div>

          <div className="SwipeToEnter__content px-4 [490px]:px-6 sm:px-8">
            <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-4 [490px]:p-6 sm:p-8 w-full max-w-md border border-emerald-400/30">
              <div className="text-center mb-4 [490px]:mb-6 sm:mb-8">
                <div className="logo w-full max-w-[280px] [490px]:max-w-[320px] sm:w-80 h-auto mx-auto bg-gradient-to-r rounded-full flex items-center justify-center mb-14 mt-16 [490px]:mb-12 sm:mb-14 [490px]:mt-8 sm:mt-10">
                  <img
                    src="/licoresbta_logo.svg"
                    alt="Licores Bogotá 24"
                    className="w-full h-auto"
                  />
                </div>

                <h1 className="text-3xl max-[490px]:text-2xl  font-bold text-white mb-3">
                  Soy mayor de 18 años
                </h1>
                <p className="text-emerald-100/90 text-md max-[490px]:text-sm sm:text-base leading-relaxed">
                  Desliza si eres mayor de edad. Al ingresar autorizas el
                  tratamiento de datos personales y los términos y condiciones.
                </p>
              </div>

              {/* Slider */}
              <Slider onConfirm={handleUnlock} />

              <div className="mt-3 max-[490px]:mt-4 p-2 max-[490px]:p-3 bg-black/20 rounded-lg border border-emerald-500/20">
                <p className="text-emerald-200/60 text-[11px] max-[490px]:text-xs sm:text-[11px] leading-relaxed text-center">
                  ⚠️ Este sitio contiene información sobre bebidas alcohólicas. Solo
                  para mayores de 18 años. El consumo excesivo de alcohol es
                  perjudicial para la salud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedWrapper>
      {/* Content */}
      {children}
    </div>
  );
}


