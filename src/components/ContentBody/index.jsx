import { Phone, ShoppingCart, MessageCircle, Instagram } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const ContentBody = () => {

  const handleContactClick = () => {
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    if (isMobile) {
      // Llamar directamente en móvil
      window.location.href = "tel:3133978710";
    } else {
      // Abrir WhatsApp Web en escritorio
      window.open("https://wa.me/573133978710", "_blank");
    }
  };

  return (
    <div className="relative flex-1  text-white flex items-center justify-center px-8 py-12">
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
              href="https://www.instagram.com/licoresbogota24_?igsh=MWtvMnRhMGV0aGxsNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 border border-gray-600 rounded-lg flex items-center justify-center hover:border-pink-400 hover:bg-pink-900 transition-all duration-300 group"
            >
              <Instagram className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </a>

            <a
              href="https://wa.me/573133978710"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 border border-green-600 rounded-lg flex items-center justify-center hover:border-green-400 hover:bg-green-900 transition-all duration-300 group"
            >
              <MessageCircle className="w-8 h-8 text-green-400 group-hover:text-white transition-colors duration-300" />
            </a>

            <a
              href="https://www.tiktok.com/@licoresbogota247?_t=ZS-8ypsfqu9GvC&_r=1"
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
            <div className="flex flex-col items-center space-y-8">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-gray-400" />
                <p className="text-xl font-mono tracking-wider">
                  313 3978710 - 311 4575936
                </p>
              </div>
              <button
                onClick={handleContactClick}
                className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-10 py-4 rounded-lg font-medium transition-colors duration-300 text-lg shadow-lg"
              >
                ¡Llámanos ya!
              </button>
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
      <aside className="absolute inset-0 -z-10">
        {/* Imagen de fondo con blur */}
        <img
          src="./public/fondo.png"
          alt="licoresbtafondo"
          className="w-full h-full object-cover blur-[3px]"
        />

        {/* Degradado superior */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#000000] to-transparent pointer-events-none"></div>

        {/* Degradado inferior */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
      </aside>

    </div>
  );
};

export default ContentBody;
