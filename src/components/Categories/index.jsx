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
        navigate(`/categoria/${encodeURIComponent(product)}`);
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
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.6; // adjust slide distance
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };


    return (
        <div className="flex flex-col w-full ">
            <div className="absolute -z-1 h-full inset-0 bg-gradient-to-b from-[#141b05] to-[#33623d] w-full">FONDO</div>

            <div className="flex flex-col p-6 mx-4 rounded-2xl bg-gradient-to-br from-[#baf5d9] via-[#29613a] to-[#0f2f1c] backdrop-blur-md bg-black/20 [490px]:p-6 sm:p-8 border border-emerald-400/30 shadow-2xl">
                {/* Header Section */}
                <div className="mb-4 text-center">
                    <h1 className="text-xl font-bold mb-1.5 tracking-tight text-[#29380a]">
                        NUESTRO MUNDO DE SABORES
                    </h1>
                    <p className="text-md font-medium text-[#d9eddc]">
                        Venta únicamente para mayores de 18 años
                    </p>

                    {/* Decorative divider */}
                    <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-[#79c68a]"></div>
                </div>

                {/* Categories List with Fade Effect */}
                <div className="relative overflow-x-auto scroll-smooth">

                    <div className="w-full flex items-center gap-4 ">
                        {/* Left Arrow */}
                        <button
                            onClick={() => scroll("left")}
                            className="flex-shrink-0 bg-white shadow-md rounded-full p-2
                   hover:bg-[#91d5a0] hover:text-white transition"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Scrollable Categories */}
                        <ul
                            ref={scrollRef}
                            className="flex gap-4 pt-2 pb-6 px-8 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#c9e8d0]"
                        >
                            {Array.from(new Set(Object.values(allProducts).map((p) => p.CATEGORIA))).map((categoria) => (
                                <li
                                    key={categoria}
                                    className="group flex-shrink-0 px-5 py-3 rounded-full shadow-md 
             bg-white text-[#33623d]
             hover:bg-[#94cfa2] hover:text-[#102516]
             transition-all duration-300 cursor-pointer text-nowrap
             font-medium text-sm tracking-wide snap-start
             hover:scale-105 active:scale-95"
                                    onClick={() => handleCategoryClick(categoria)}
                                >
                                    {capitalizeFirstLetter(categoria)}
                                </li>

                            ))}
                        </ul>

                        {/* Right Arrow */}
                        <button
                            onClick={() => scroll("right")}
                            className="flex-shrink-0 bg-white shadow-md rounded-full p-2
                   hover:bg-[#33623d] hover:text-white transition"
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