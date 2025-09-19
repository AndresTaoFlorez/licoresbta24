import { CirclePlus } from 'lucide-react';

function ProductCard({ index, product }) {
    return (
        <div
            key={index}
            className="group relative w-full rounded-2xl bg-[#ffffff] transition-all duration-300 overflow-hidden flex flex-col">

            {/* Imagen del producto con fondo blanco */}
            <div className="relative w-full h-52 flex items-center justify-center overflow-hidden rounded-t-2xl bg-white">
                <img
                    src={product.FOTO}
                    alt={product.PRODUCTO}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
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
                        className="group/button flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 text-white shrink-0 cursor-pointer"
                        aria-label="Añadir al carrito"
                    >
                        <CirclePlus color='#33623d' strokeWidth={2.5}/>
                    </button>

                   
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
