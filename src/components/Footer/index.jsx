import { Phone, ShoppingCart, MessageCircle, Instagram } from 'lucide-react';
import { handleContactClick } from '../WhatsAppButton';
import { FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="flex h-full w-full bg-gradient-to-br from-[#468553] to-[#000000] text-white py-8 px-6">

      {/* Contenedor del Footer */}
      <div className="flex flex-col relative w-full mx-auto md:flex-row justify-between items-center space-y-4 md:space-y-0 md:gap-4 z-1">

        {/* Contactanos */}
        <section className="grid grid-cols-1 pb-4 [@media(min-width:1010px)]:grid-cols-2 gap-4 justify-around items-center">
          {/* Sección de Redes Sociales */}
          <div className='flex flex-col justify-center items-center'>
            <div className="space-y-10 p-4">
              <p className="text-gray-300">
                Conéctate con nosotros y descubre ofertas exclusivas
              </p>
            </div>
            {/* Logos de Redes Sociales */}
            <div className="flex justify-center space-x-10">
              <a
                href="https://www.instagram.com/licoresbogota24_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border border-gray-600 rounded-lg flex items-center justify-center hover:border-pink-400 hover:bg-pink-900 transition-all duration-300 group"
              >
                <Instagram className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>

              <a
                href="https://www.tiktok.com/@licoresbogota24"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 border border-gray-600 rounded-lg flex items-center justify-center hover:border-gray-400 hover:bg-gray-900 transition-all duration-300 group"
              >
                <FaTiktok className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>

          </div>
          <div className="max-w-2xl w-full text-center space-y-20">

            {/* Sección de Contacto */}
            <div className="space-y-4">
              <h2 className="text-2xl font-light tracking-wide">Contáctanos</h2>
              <div className="flex flex-col text-md items-center space-y-5">
                <div className='flex'>
                  ¡Llámanos ya! <Phone className="w-6 h-6 ml-4 text-gray-400" />
                </div>
                <div className="flex items-center space-x-4" >
                  {/* <p className="text-xl font-mono tracking-wider">
                    313 3978710 - 311 4575936
                    </p> */}
                  <p className="font-mono tracking-wider flex flex-col gap-2 justify-center items-center [@media(min-width:508px)]:flex-row">
                    <button
                      onClick={() => handleContactClick("3133978710")}
                      className="text-gray-200 cursor-pointer hover:underline"
                    >
                      313 3978710
                    </button>
                    <span> </span>
                    <button
                      onClick={() => handleContactClick("3114575936")}
                      className="text-gray-200 cursor-pointer hover:underline"
                    >
                      311 4575936
                    </button>
                  </p>

                </div>
                {/* <button
                onClick={() => handleContactClick('3133978710')}
                className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-10 py-4 rounded-lg font-medium transition-colors duration-300 text-lg shadow-lg"
              >
              </button> */}
              </div>
            </div>

          </div>


        </section>

        {/* Advertencia al consumo de alcohol */}
       <div className="text-center font-bold text-md opacity-70 max-w-3xl mx-auto leading-relaxed">
          El consumo de bebidas debe realizarse de manera responsable y únicamente por personas en edad legal para hacerlo.
          Disfruta con moderación y cuida de ti y de los tuyos.
        </div>


        {/* Logos medios de pago */}
        <div className=" text-gray-300 py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Logos métodos de pago */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <img src="/nequi.svg" alt="Nequi" className="w-14 h-8 sm:w-14 sm:h-10 object-contain" />
              <img src="/daviplata.svg" alt="Daviplata" className="w-14 h-8 sm:w-16 sm:h-10 object-contain" />
              <img src="/visa.svg" alt="Visa" className="w-14 h-8 sm:w-14 sm:h-10 object-contain" />
              <img src="/mastercard.svg" alt="MasterCard" className="w-14 h-8 sm:w-14 sm:h-10 object-contain" />
              <img src="/maestro.svg" alt="Maestro" className="w-14 h-8 sm:w-14 sm:h-10 object-contain" />
            </div>
          </div>
        </div>


        {/* Derechos reservados */}
        <div className="text-xs opacity-70 text-center md:text-right">
          © {new Date().getFullYear()} Bogotá 24. Todos los derechos reservados.
        </div>
      </div>

      {/* Background */}
      {/* <div className="absolute top-0 h-full w-full z-0 bg-gradient-to-b from-[#000000] to-transparent pointer-events-none blur-sm">
        <img
          src="/fondo.png"
          alt="licoresbtafondo"
          className="w-full h-full object-cover"
        />
      </div> */}


    </footer>
  );
}

export default Footer;
