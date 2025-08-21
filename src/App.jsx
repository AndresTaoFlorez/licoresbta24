import './App.css'
import Header from './components/Header/index.jsx'
import ContentBody from './components/ContentBody/index.jsx'
import Footer from './components/Footer/index.jsx'
import SwipeToEnter from './pages/SwipeToEnter/index.jsx'
import { useLocation } from './context/context.jsx'
import { useDeliveryLocation } from './components/DeliveryLocationSelector/index.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react'
import useProducts from './customHooks/useProducts.jsx'
import Categories from './components/Categories';
import CategoryPage from './components/CategoryPage';

function App() {

  const { Modal } = useDeliveryLocation();
  const { open } = useLocation();
  const { allProducts } = useProducts();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    open();
  }, []);

  // Cuando allProducts cambie y tenga datos, termina el loading
  useEffect(() => {
    if (allProducts && Object.keys(allProducts).length > 0) {
      setLoading(false);
    }
  }, [allProducts]);

  return (
    <Router>
      <SwipeToEnter loading={loading}>
        <Modal />
        <Header />
        <ContentBody />
        <Footer />
      </SwipeToEnter>

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/categoria/:categoriaName" element={<CategoryPage allProducts={allProducts} />} />
      </Routes>
    </Router>
  )
}

export default App
