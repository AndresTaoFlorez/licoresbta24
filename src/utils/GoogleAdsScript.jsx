import { useEffect } from 'react';

/**
 * GoogleAdsScript - Componente que carga el script de Google Ads
 * usando la variable de entorno VITE_GOOGLE_ADS_PUBLISHER_ID
 *
 * IMPORTANTE: Solo se cargará si la variable de entorno está configurada
 */
const GoogleAdsScript = () => {
  useEffect(() => {
    const publisherId = import.meta.env.VITE_GOOGLE_ADS_PUBLISHER_ID;

    // Solo cargar el script si hay un Publisher ID configurado
    if (!publisherId || publisherId === 'ca-pub-XXXXXXXXXXXXXXXX') {
      console.info('Google Ads: Publisher ID no configurado. Configura VITE_GOOGLE_ADS_PUBLISHER_ID en .env');
      return;
    }

    // Verificar si el script ya está cargado
    const existingScript = document.querySelector(
      `script[src*="adsbygoogle.js"]`
    );

    if (existingScript) {
      return; // Ya está cargado
    }

    // Crear y cargar el script
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      console.info('Google Ads script loaded successfully');
    };

    script.onerror = () => {
      console.error('Error loading Google Ads script');
    };

    document.head.appendChild(script);

    // Cleanup al desmontar
    return () => {
      // No removemos el script porque puede estar siendo usado por anuncios activos
    };
  }, []);

  return null; // Este componente no renderiza nada
};

export default GoogleAdsScript;
