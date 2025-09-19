
import { Helmet } from "react-helmet";
import Products from '../features/products/components/ProductList.jsx'
import Categories from '../shared/components/Categories.jsx';
import { useAppContext } from "../context/AppContext.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import { Routes, Route } from "react-router-dom";

const ContentBody = () => {

  const { products, setProducts, open, setLoading } = useAppContext();

  return (
    <>
      <Helmet>
        <title>Licores Bogotá 24 - Licoresbta24.club</title>
        <meta name="description" content="Compra bebidas en Bogotá las 24 horas con entrega rápida." />
      </Helmet>
      <Categories />
      <Routes>
        <Route path="/" element={<Products items={products} />} />
        <Route path="/home" element={<Products items={products} />} />
        <Route path="/:categoryName" element={<CategoryPage />} />
      </Routes>
    </>
  );
};




export default ContentBody;
