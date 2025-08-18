function Header() {
  return (
    <header className="w-full bg-gradient-to-br relative overflow-hidden">

      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 transform skew-y-12 animate-pulse"></div>

      {/* Contenido principal del header */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">

        {/* Contenedor del logo */}
        <a
          href="https://www.licoresbogota24.club/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="p-6 animate-logo-bounce">
            <div className="relative flex flex-col items-center group animate-fade-in-accelerate">
              <img
                className="w-[500px] max-w-full md:w-[500px] sm:w-[350px] transition-all animate-glow"
                src="/licoresbta_logo.svg"
                alt="licoresbta_logo"
              />

              <div className="absolute bottom-3 left-8 md:bottom-3 md:left-8 max-[770px]:static max-[770px]:mt-4 max-[770px]:text-center animate-fade-in-accelerate transition-all duration-500 group-hover:animate-glow">
                <p className="text-md pb-2 md:text-[0.8em] text-gray-100 font-medium text-center max-w-md leading-relaxed">
                  Siempre listos para tus mejores momentos
                </p>
              </div>
            </div>
          </div>
        </a>



      </div>
      {/* Efectos decorativos de fondo */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-md"></div>
    </header>
  )
}

export default Header
