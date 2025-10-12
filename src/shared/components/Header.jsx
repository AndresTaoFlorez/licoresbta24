import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router";
import { MapPin } from "lucide-react";

function Header() {
  const { open, location } = useAppContext();

  return (
    <div className="flex flex-col h-80 max-[365px]:h-72 w-auto relative overflow-hidden">

      {/* Ubicación */}
      <div
        onClick={open}
        className="absolute z-1 top-4 left-4"
      >
        <button
          aria-label="Seleccionar ubicación de entrega"
          title="Seleccionar ubicación de entrega"
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg shadow-md hover:from-green-800 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{location}</span>
        </button>
      </div>

      {/* Contenido principal del header */}
      <div className="relative pt-16 z-0 h-full xs:mt-20 flex flex-col items-center px-4">

        {/* Contenedor del logo */}
        <Link to="/home" className="block">
          <div className="animate-logo-bounce">
            <div className="relative flex flex-col items-center group animate-fade-in-accelerate">
              <img
                className="w-[500px] max-w-full max-[773px]:w-[400px] sm:w-[350px] transition-all animate-glow drop-shadow-md:"
                src="/licoresbta_logo.svg"
                alt="licoresbta_logo"
              />

              <div className="absolute bottom-3 left-8 md:bottom-3 md:left-8 max-[770px]:static max-[770px]:mt-4 max-[770px]:text-center animate-fade-in-accelerate transition-all duration-500 group-hover:animate-glow">
                <p className="text-md pb-2 px-2 md:text-[0.8em] text-gray-100 font-medium text-center max-w-md leading-relaxed">
                  Siempre listos para tus mejores momentos
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>


      {/* Efectos decorativos de fondo */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md"></div>

    </div >
  )
}

export default Header
