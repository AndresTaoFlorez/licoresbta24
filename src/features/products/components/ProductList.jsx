import ProductCard from "../components/ProductCard";

const ProductList = ({ items }) => {

  return (
    <div
      className="
        grid
        w-full
        max-lg:w-[50vw]
        grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
        gap-6
        justify-center
      "
    >
      {Object.values(items).map((product) => (
        <ProductCard key={product.PRODUCTO} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
