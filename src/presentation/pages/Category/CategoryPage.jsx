import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModernProductCard, ModernProductCardSkeleton } from "../../../shared/components";
import { setCategory } from "../../../infrastructure/state/slices/productsSlice.js";
import './CategoryPage.scss';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);
  const filteredProducts = useSelector((state) => state.products.filteredItems);

  useEffect(() => {
    if (categoryName) {
      dispatch(setCategory(categoryName));
    }
  }, [categoryName, dispatch]);

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
  };

  const handleToggleFavorite = (product) => {
    console.log('Toggle favorite:', product);
  };

  if (loading) {
    return (
      <div className="category-page">
        <div className="category-page__grid">
          {[...Array(8)].map((_, i) => (
            <ModernProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const products = Object.values(filteredProducts);

  if (!products || products.length === 0) {
    return (
      <div className="category-page__empty">
        <p className="category-page__empty-text">No hay productos disponibles en esta categoría.</p>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-page__grid">
        {products.map((product, index) => {
          let badge = null;
          if (index % 8 === 0) badge = 'NEW';
          if (index % 12 === 0) badge = 'SALE';

          return (
            <ModernProductCard
              key={`${product.PRODUCTO}-${index}`}
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

export default CategoryPage;
