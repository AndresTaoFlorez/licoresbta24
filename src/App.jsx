import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './shared/styles/App.css';

// Lazy load heavy components
const SwipeToEnter = lazy(() => import('./presentation/pages/SwipeToEnter/SwipeToEnter.jsx'));
const Home = lazy(() => import('./presentation/pages/Home/Home.jsx'));
const WhatsAppButton = lazy(() => import('./shared/components/WhatsAppButton/WhatsAppButton.jsx'));
const ScrollToTopButton = lazy(() => import('./shared/components/ScrollToTopButton/ScrollToTopButton.jsx'));

// Keep critical UI components loaded immediately
import { useDeliveryLocation } from './presentation/components/features/location/DeliveryLocationSelector/useDeliveryLocation.jsx';
import { Header, Footer } from './presentation/components/layout';
import { fetchProducts } from './infrastructure/state/slices/productsSlice.js';
import { openLocationModal } from './infrastructure/state/slices/locationSlice.js';

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
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'white' }}><div style={{ animation: 'spin 1s linear infinite', borderRadius: '9999px', height: '4rem', width: '4rem', borderBottom: '4px solid rgb(22, 163, 74)' }}></div></div>}>
      <SwipeToEnter loading={loading}>
        <div className="app-content">
          <Modal />
          <Suspense fallback={null}>
            <WhatsAppButton />
            <ScrollToTopButton />
          </Suspense>
          <Header />
          <Suspense fallback={<div style={{ minHeight: '50vh' }}></div>}>
            <Home />
          </Suspense>
          <Footer />
        </div>
      </SwipeToEnter>
    </Suspense>
  );
}

export default App;
