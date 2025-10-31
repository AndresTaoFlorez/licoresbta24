import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './shared/styles/App.css';
import SwipeToEnter from './presentation/pages/SwipeToEnter/SwipeToEnter.jsx';
import { useDeliveryLocation } from './presentation/components/features/location/DeliveryLocationSelector/useDeliveryLocation.jsx';
import { Header, Footer } from './presentation/components/layout';
import Home from './presentation/pages/Home/Home.jsx';
import { fetchProducts } from './infrastructure/state/slices/productsSlice.js';
import { openLocationModal } from './infrastructure/state/slices/locationSlice.js';
import { WhatsAppButton } from './shared/components';

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
      <div className="app-content">
        <Modal />
        <WhatsAppButton />
        <Header />
        <Home />
        <Footer />
      </div>
    </SwipeToEnter>
  );
}

export default App;
