import { Phone, ShoppingCart, MessageCircle, Instagram } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import WhatsAppButton, { handleContactClick } from '../components/WhatsAppButton';

const ContentBody = () => {

  return (
    <div className="relative flex-1 text-white flex items-center justify-center px-8 py-12">
      <Helmet>
        <title>Licores Bogotá 24 - Licoresbta24.club</title>
        <meta name="description" content="Compra bebidas en Bogotá las 24 horas con entrega rápida." />
      </Helmet>

      {/* <div className="bg-black text-white flex items-center justify-center px-8 py-16"> */}
      <section className="grid min-h-full grid-cols-1 [@media(min-width:1010px)]:grid-cols-3 gap-8 justify-around items-center">
        {/* Sección de Redes Sociales */}
        <div className='flex flex-col justify-center items-center'>
          <div className="space-y-10 p-4">
            <p className="text-xl text-gray-300">
              Conéctate con nosotros y descubre ofertas exclusivas
            </p>
          </div>
          {/* Logos de Redes Sociales */}
          <div className="flex justify-center space-x-10">
            <a
              href="https://www.instagram.com/licoresbogota24"
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
          <div className="space-y-10">
            <h2 className="text-4xl font-light tracking-wide">Contáctanos</h2>
            <div className="flex flex-col text-xl items-center space-y-8">
              <div className='flex'>
                ¡Llámanos ya! <Phone className="w-6 h-6 ml-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-4" >
                {/* <p className="text-xl font-mono tracking-wider">
                    313 3978710 - 311 4575936
                    </p> */}
                <p className="text-xl font-mono tracking-wider flex flex-col gap-2 justify-center items-center [@media(min-width:508px)]:flex-row">
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
        <div className='flex flex-col justify-center items-center'>
          <div className=" space-y-10 ">
            <p className="text-xl text-gray-300 p-4">
              Descubre todos nuestros productos aquí
            </p>
          </div>
          {/* Versión con gradiente colorido */}
          <div className="w-fit">
            <a
              href="https://www.licoresbogota24.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="group 
             bg-gradient-to-r from-[#079843] to-[#468553] 
             hover:from-purple-700 hover:to-[#3d7448] 
             text-white font-bold py-4 px-8 rounded-full shadow-lg 
             transition-colors transition-transform transition-shadow
             duration-300 
             hover:shadow-xl hover:scale-105 
             flex items-center space-x-4
             cursor-pointer
             w-fit
             pr-8"
            >
              <div className="relative">
                <ShoppingCart size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-full animate-pulse"></div>
              </div>
              <span className="text-lg font-semibold tracking-wide">Comprar ahora</span>
            </a>

          </div>
        </div>
      </section>

      {/* Boton de WhatsApp */}
      <aside className="absolute inset-0 -z-10">
        {/* Imagen de fondo con blur */}
        <img
          src="/fondo.png"
          alt="licoresbtafondo"
          className="w-full h-full object-cover blur-[3px]"
        />

        {/* Degradado superior */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#000000] to-transparent pointer-events-none"></div>

        {/* Degradado inferior */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
      </aside>

      <div className="fixed bottom-4 right-4 z-50">
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default ContentBody;
