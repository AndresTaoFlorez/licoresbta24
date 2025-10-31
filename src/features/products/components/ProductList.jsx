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
    <div className="category-page">
      <div className="category-page__grid">
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
    </div>
  );
};

export default ProductList;
