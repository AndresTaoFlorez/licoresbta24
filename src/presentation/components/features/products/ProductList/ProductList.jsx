import { useEffect } from 'react';
import { ModernProductCard } from "../../../../../shared/components";
import { trackProductListView, trackProductClick, trackAddToCart } from "../../../../../utils/googleAds.js";

const ProductList = ({ items }) => {
  // Track when product list is viewed
  useEffect(() => {
    if (items && Object.keys(items).length > 0) {
      const productsArray = Object.values(items);
      trackProductListView(productsArray, 'Home Product List');
    }
  }, [items]);

  const handleAddToCart = (product) => {
    // Track add to cart event
    trackAddToCart(product.PRODUCTO, product.PRECIO);
    // TODO: Implement cart functionality
    console.log('Add to cart:', product);
  };

  const handleToggleFavorite = (product) => {
    // TODO: Implement favorites functionality
    console.log('Toggle favorite:', product);
  };

  const handleProductClick = (product, index) => {
    // Track product click
    trackProductClick(product, index);
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
            <div key={product.PRODUCTO} onClick={() => handleProductClick(product, index)}>
              <ModernProductCard
                product={product}
                badge={badge}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
