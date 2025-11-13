import { useSelector, useDispatch } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ModernCategories } from '../../../shared/components';
import { setCategory } from '../../../infrastructure/state/slices/productsSlice.js';

// Lazy load route components
const Products = lazy(() => import('../../components/features/products/ProductList/ProductList.jsx'));
const CategoryPage = lazy(() => import("../Category/CategoryPage.jsx"));

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  const handleCategoryClick = (categoryName) => {
    dispatch(setCategory(categoryName));
  };

  // Update document title dynamically
  useEffect(() => {
    document.title = "Licores Bogotá 24 - Licoresbta24.club";
  }, []);

  return (
    <div className="content-body">
      <ModernCategories
        products={products}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,0,0,0.1)', borderTop: '3px solid rgb(51, 98, 61)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div></div>}>
        <Routes>
          <Route path="/" element={<Products items={products} />} />
          <Route path="/home" element={<Products items={products} />} />
          <Route path="/:categoryName" element={<CategoryPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};




export default Home;
