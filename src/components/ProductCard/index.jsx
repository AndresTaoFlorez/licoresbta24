import { Grip } from 'lucide-react';



function ProductCard({ index, product }) {
    return (
        <div
            key={index}
            className="group relative max-w-[200px] w-full rounded-2xl bg-[#eafff3] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col backdrop-blur-sm">

            {/* Imagen del producto con fondo blanco */}
            <div className="relative w-full h-52 flex items-center justify-center overflow-hidden rounded-t-2xl bg-white">
                <img
                    src={product.FOTO}
                    alt={product.PRODUCTO}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Overlay sutil en hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, #141b0510, transparent)' }}
                />
            </div>

            {/* Contenido del producto */}
            <div className="flex flex-col flex-1 p-4 space-y-3">
                {/* Nombre del producto */}
                <h3
                    className="text-sm sm:text-base font-semibold leading-tight line-clamp-2 min-h-[2.8rem] tracking-tight overflow-hidden text-ellipsis"
                    style={{ color: '#141b05' }}
                >
                    {product.PRODUCTO}
                </h3>

                <div className="flex-1" />

                {/* Precio y categoría */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col space-y-1 overflow-hidden">
                        <span
                            className="text-lg sm:text-xl font-bold tracking-tight truncate"
                            style={{ color: '#33623d' }}
                        >
                            ${product.PRECIO?.toLocaleString('es-CO')}
                        </span>
                        <span
                            className="text-xs sm:text-sm font-medium capitalize color-[#141b0580] truncate"
                        >
                            {product.CATEGORIA}
                        </span>
                    </div>

                    <button
                        className="group/btn flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-white shrink-0"
                        style={{ backgroundColor: '#33623d' }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#141b05')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#33623d')}
                        aria-label="Añadir al carrito"
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 8L5 5H3m4 8v8a2 2 0 002 2h6a2 2 0 002-2v-8"
                            />
                        </svg>
                    </button>

                    {/* <button
                        className="group/btn flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 text-white shrink-0"
                        style={{ backgroundColor: '#33623d' }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#141b05')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#33623d')}
                        aria-label="Añadir al carrito"
                    >
                        <Grip />

                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
