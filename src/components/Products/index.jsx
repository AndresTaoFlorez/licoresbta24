import useProducts from "../../customHooks/useProducts";
import ProductCard from "../ProductCard";


function Products() {
    const { productsFiltered } = useProducts();

    return (
        <div className="grid 
     w-[calc(100vw-4rem)] min-[992px]:w-[calc(992px-4rem)] mx-auto 
     py-10 
     grid-cols-[repeat(auto-fill,minmax(180px,1fr))] 
     gap-6
     justify-center
     max-lg:justify-items-center">
            {
                productsFiltered.map((p) => (
                    <ProductCard key={p.PRODUCTO} product={p} />
                ))
            }
            {
                productsFiltered.length === 0 && (
                    <p>No hay productos disponibles</p>
                )
            }
        </div >

    )
}

export default Products;