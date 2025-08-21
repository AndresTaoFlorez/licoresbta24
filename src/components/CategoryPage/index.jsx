import { useParams } from "react-router-dom";
import useProducts from "../../customHooks/useProducts.jsx";
import { useLocation } from "../../context/context.jsx";
import { useEffect, useState } from "react";

function CategoryPage() {
  const { categoriaName } = useParams(); // lee la categoría desde la URL
  const { setCategories } = useLocation();
  const { allProducts } = useProducts();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (allProducts) {
      const filtered = Object.values(allProducts).filter(
        (p) => p.CATEGORIA === categoriaName
      );
      setCategories(categoriaName);
      setProducts(filtered);
    }
  }, [allProducts, categoriaName]);

  return (<></>);
}

export default CategoryPage;
