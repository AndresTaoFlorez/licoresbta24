import useProducts from "../../customHooks/useProducts";
import ProductCard from "../ProductCard";


function Products() {
    const { productsFiltered } = useProducts();

    return (
        <div className="grid w-full px-[10%] py-10 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] max-[480px]:grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-6">
            {productsFiltered.map((p) => (
                <ProductCard key={p.PRODUCTO} product={p} />
            ))}

            {productsFiltered.length === 0 && (
                <p>No hay productos disponibles</p>
            )}
        </div>

    )
}

export default Products;