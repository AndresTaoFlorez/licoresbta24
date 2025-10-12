import './shared/styles/App.css'
import SwipeToEnter from './features/landing/pages/SwipeToEnter.jsx'
import { useDeliveryLocation } from './features/location/components/DeliveryLocationSelector.jsx'
import Header from './shared/components/Header.jsx'
import Footer from './shared/components/Footer.jsx'
import { useAppContext } from './context/AppContext.jsx'
import ContentBody from './pages/ContentBody.jsx'
function App() {


  const { Modal } = useDeliveryLocation();
  const { loading } = useAppContext();

  // <!-- Google tag (gtag.js) -->
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


  return (
    <SwipeToEnter loading={loading}>
      <Modal />
      <Header />
      <ContentBody />
      <Footer />
    </SwipeToEnter>
  )
}

export default App
