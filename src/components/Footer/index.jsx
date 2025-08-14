function Footer() {
  return (
    <footer className="flex flex-1 w-full bg-gradient-to-br from-[#468553] to-[#000000] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:gap-4">

        {/* Nombre y eslogan */}
        <div className="text-center font-bold text-md opacity-70 max-w-3xl mx-auto leading-relaxed">
          El consumo de bebidas debe realizarse de manera responsable y únicamente por personas en edad legal para hacerlo.
          Disfruta con moderación y cuida de ti y de los tuyos.
        </div>

        {/* Logos medios de pago */}
        <div className=" text-gray-300 py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Logos métodos de pago */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <img src="/nequi.svg" alt="Nequi" className="w-12 h-8 sm:w-14 sm:h-10 object-contain" />
              <img src="/daviplata.svg" alt="Daviplata" className="w-12 h-8 sm:w-14 sm:h-10 object-contain" />
              <img src="/visa.svg" alt="Visa" className="w-12 h-8 sm:w-14 sm:h-10 object-contain" />
              <img src="/mastercard.svg" alt="MasterCard" className="w-12 h-8 sm:w-14 sm:h-10 object-contain" />
              <img src="/maestro.svg" alt="Maestro" className="w-12 h-8 sm:w-14 sm:h-10 object-contain" />
            </div>
          </div>
        </div>


        {/* Derechos reservados */}
        <div className="text-xs opacity-70 text-center md:text-right">
          © {new Date().getFullYear()} Bogotá 24. Todos los derechos reservados.
        </div>
      </div>



      {/* Advertencia de consumo responsable */}

    </footer>
  );
}

export default Footer;
