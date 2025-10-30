import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './shared/styles/App.css';
import SwipeToEnter from './features/landing/pages/SwipeToEnter.jsx';
import { useDeliveryLocation } from './features/location/components/useDeliveryLocation.jsx';
import BackgroundEffects from './shared/components/BackgroundEffects.jsx';
import Header from './shared/components/Header.jsx';
import Footer from './shared/components/Footer.jsx';
import ContentBody from './pages/ContentBody.jsx';
import { fetchProducts } from './store/slices/productsSlice.js';
import { openLocationModal } from './store/slices/locationSlice.js';

function App() {
  const dispatch = useDispatch();
  const { Modal } = useDeliveryLocation();
  const loading = useSelector((state) => state.products.loading);
  const location = useSelector((state) => state.location.current);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Auto-open location modal if default location is set
  useEffect(() => {
    if (location === 'Bogotá') {
      dispatch(openLocationModal());
    }
  }, [dispatch, location]);

  // Google Analytics
  useEffect(() => {
    if (import.meta.env.PROD) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=AW-17474983793";
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'AW-17474983793');
    }
  }, []);

  return (
    <SwipeToEnter loading={loading}>
      <BackgroundEffects />
      <div className="app-content">
        <Modal />
        <Header />
        <ContentBody />
        <Footer />
      </div>
    </SwipeToEnter>
  );
}

export default App;
