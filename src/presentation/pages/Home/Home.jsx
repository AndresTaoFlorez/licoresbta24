import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Products from '../../components/features/products/ProductList/ProductList.jsx';
import { ModernCategories } from '../../../shared/components';
import CategoryPage from "../Category/CategoryPage.jsx";
import { Routes, Route } from "react-router-dom";
import { setCategory } from '../../../infrastructure/state/slices/productsSlice.js';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  const handleCategoryClick = (categoryName) => {
    dispatch(setCategory(categoryName));
  };

  return (
    <div className="content-body">
      <Helmet>
        <title>Licores Bogotá 24 - Licoresbta24.club</title>
        <meta name="description" content="Compra bebidas en Bogotá las 24 horas con entrega rápida." />
      </Helmet>
      <ModernCategories
        products={products}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      <Routes>
        <Route path="/" element={<Products items={products} />} />
        <Route path="/home" element={<Products items={products} />} />
        <Route path="/:categoryName" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};




export default Home;
