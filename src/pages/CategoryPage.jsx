import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../features/products/components/ProductCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { setFilteredProducts, filteredProducts, products, loading } = useAppContext();

  useEffect(() => {
    if (loading || !products || !categoryName) return;

    setFilteredProducts(
      Object.values(products).filter(
        (p) => p?.CATEGORIA?.toLowerCase() === categoryName.toLowerCase()
      )
    );
  }, [loading, products, categoryName, setFilteredProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-600">
        Loading...
      </div>
    );
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="flex justify-around items-center py-10 text-gray-500">
        No hay productos disponibles en esta categoría.
      </div>
    );
  }

  return (
    <div
      className="
        grid
        sm:w-full
        md:w-11/12
        grid-cols-[repeat(auto-fill,minmax(220px,1fr))] 
        mx-auto
        gap-4
      "
    >
      {filteredProducts.map((product) => (
        <ProductCard key={product.PRODUCTO} product={product} />
      ))}
    </div>
  );
};

export default CategoryPage;
