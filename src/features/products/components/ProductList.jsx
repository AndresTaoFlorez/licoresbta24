import { ModernProductCard } from "../../../presentation/design-system/components";

const ProductList = ({ items }) => {
  const handleAddToCart = (product) => {
    // TODO: Implement cart functionality
    console.log('Add to cart:', product);
  };

  const handleToggleFavorite = (product) => {
    // TODO: Implement favorites functionality
    console.log('Toggle favorite:', product);
  };

  return (
    <div
      className="
        grid
        w-full
        grid-cols-[repeat(auto-fill,minmax(160px,1fr))]
        gap-4
        justify-center
        px-6
        py-6
        max-w-[1400px]
        mx-auto
      "
      style={{ paddingLeft: 'max(1.5rem, env(safe-area-inset-left))', paddingRight: 'max(1.5rem, env(safe-area-inset-right))' }}
    >
      {Object.values(items).map((product, index) => {
        // Add badges for new products
        let badge = null;
        if (index % 8 === 0) badge = 'NEW';
        if (index % 12 === 0) badge = 'SALE';

        return (
          <ModernProductCard
            key={product.PRODUCTO}
            product={product}
            badge={badge}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
