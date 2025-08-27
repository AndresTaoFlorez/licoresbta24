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
      {/* <div className='bg-[#235936] '> */}
      <div className='bg-[#2b5e2c]'>

        <div className="SwipeToEnter__background">
          <div className="sphere sphere--white"></div>
          <div className="sphere sphere--green-light"></div>
          <div className="sphere sphere--emerald"></div>
          <div className="sphere sphere--white-dim"></div>
          <div className="sphere sphere--center"></div>
        </div>

        <SwipeToEnter loading={loading}>
          <Modal />
          <Header />
          <ContentBody />
          <Footer />
        </SwipeToEnter>
      </div>

      <Routes>
        <Route path="/" element={<SwipeToEnter />} />
        <Route path="/:categoriaName" element={<CategoryPage allProducts={allProducts} />} />
      </Routes>
    </Router>
  )
}

export default App
