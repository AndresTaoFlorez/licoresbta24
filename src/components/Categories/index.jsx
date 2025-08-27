import { useEffect, useRef } from "react";
import useProducts from "../../customHooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useLocation } from "../../context/context";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons


function Categories() {
    const { allProducts } = useProducts();
    const { setCategories } = useLocation();
    const navigate = useNavigate();


    const handleCategoryClick = (productname) => {
        const product = productname.trim();
        setCategories(product);
        navigate(`/${encodeURIComponent(product)}`);
        console.log(product)
    };


    const capitalizeFirstLetter = (string) => {
        if (string.length === 0) {
            return ""; // Handle empty strings
        }
        const words = string.split(" ");
        const capitalizedWords = words.map(word => {
            if (word.length === 0) {
                return "";
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Ensure rest of word is lowercase
        });
        return capitalizedWords.join(" ");
    }



    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -clientWidth / 2 : clientWidth / 2,
                behavior: "smooth",
            });
        }
    };


    return (
        <div className="flex flex-col ">
            <div className="absolute -z-1 h-full inset-0 bg-[#235936] w-full"></div>

            <div
                className="
                relative flex flex-col
                w-[calc(100vw-4rem)]
                min-[992px]:w-[calc(992px-4rem)]
                mx-4 p-6 sm:p-8 [490px]:p-6
                rounded-2xl border border-emerald-400/30
                bg-gradient-to-br from-[#2a6b41be] via-[#1e4c2eb6] to-[#1e4c2ebc]
                bg-black/20 backdrop-blur-md
                shadow-[0_0_20px_rgba(0,0,0,0.3)]
                overflow-hidden
                "
            >
                {/* Text in the categories section */}
                <div className="mb-4 text-center">
                    <h1 className="text-xl font-bold mb-1.5 tracking-tight text-[#a1b373]">
                        NUESTRO MUNDO DE SABORES
                    </h1>
                    <p className="text-md font-medium text-[#d9eddc]">
                        Venta únicamente para mayores de 18 años
                    </p>

                    {/* Decorative divider */}
                    <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-[#79c68a]"></div>
                </div>

                {/* Categories List with Fade Effect */}
                <div className="relative">
                    <div className="w-full flex items-center gap-4">
                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll("left")}
                            className="flex-shrink-0 bg-white shadow-md rounded-full p-2 z-20 relative
                                hover:bg-[#91d5a0] hover:text-white transition-all duration-300"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Scrollable Categories Container with Fade Effects */}
                        <div className="relative flex-1 overflow-hidden">

                            {/* Scrollable Categories */}
                            <ul
                                ref={scrollRef}
                                className="flex gap-4 pt-2 pb-6 px-8 overflow-x-auto scroll-smooth 
                       snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent 
                       scrollbar-thumb-[#c9e8d0]"
                                style={{
                                    maskImage:
                                        "linear-gradient(to right, transparent 0px, black 20px, black calc(100% - 20px), transparent 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to right, transparent 0px, black 20px, black calc(100% - 20px), transparent 100%)",
                                }}
                            >
                                {Array.from(
                                    new Set(Object.values(allProducts).map((p) => p.CATEGORIA))
                                ).map((categoria) => (
                                    <li
                                        key={categoria}
                                        className="
                                         group flex-shrink-0 
                                        px-3 py-1 text-[10px] tracking-normal   /* 📱 base = mobile */
                                        sm:px-4 sm:py-2 sm:text-xs sm:tracking-wide   /* tablets */
                                        md:px-5 md:py-3 md:text-sm                /* desktop */
                                        rounded-full shadow-md 
                                        bg-white text-[#33623d]
                                        hover:bg-[#94cfa2] hover:text-[#102516]
                                        transition-all duration-300 cursor-pointer 
                                        whitespace-normal sm:whitespace-nowrap
                                        font-medium snap-start
                                        hover:scale-105 active:scale-95
                                    "
                                        onClick={() => handleCategoryClick(categoria)}
                                    >
                                        {capitalizeFirstLetter(categoria)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll("right")}
                            className="flex-shrink-0 bg-white shadow-md rounded-full p-2 z-20 relative
                     hover:bg-[#33623d] hover:text-white transition-all duration-300"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Categories;