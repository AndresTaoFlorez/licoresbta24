import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './GoogleAdBanner.scss';

/**
 * GoogleAdBanner - Componente para mostrar anuncios de Google AdSense
 *
 * IMPORTANTE: Este componente está listo pero NO se mostrará hasta que:
 * 1. Reemplaces el ID de publisher en index.html
 * 2. Obtengas el ad-slot desde Google AdSense
 * 3. Agregues este componente donde quieras mostrar anuncios
 *
 * @param {string} slot - El ID del ad slot desde Google AdSense (ej: '1234567890')
 * @param {string} format - Formato del anuncio ('auto', 'rectangle', 'vertical', 'horizontal')
 * @param {string} className - Clase CSS adicional
 * @param {boolean} responsive - Si el anuncio debe ser responsive (default: true)
 */
const GoogleAdBanner = ({
  slot,
  format = 'auto',
  className = '',
  responsive = true
}) => {
  useEffect(() => {
    try {
      // Inicializar el anuncio cuando el componente se monta
      if (window.adsbygoogle && slot) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Error loading Google Ad:', error);
    }
  }, [slot]);

  // No renderizar si no hay slot configurado
  if (!slot) {
    return (
      <div className="google-ad-banner__placeholder">
        <p>⚠️ Configura el ad-slot en Google AdSense</p>
      </div>
    );
  }

  const publisherId = import.meta.env.VITE_GOOGLE_ADS_PUBLISHER_ID || 'ca-pub-XXXXXXXXXXXXXXXX';

  return (
    <div className={`google-ad-banner ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

GoogleAdBanner.propTypes = {
  slot: PropTypes.string.isRequired,
  format: PropTypes.oneOf(['auto', 'rectangle', 'vertical', 'horizontal']),
  className: PropTypes.string,
  responsive: PropTypes.bool
};

export default GoogleAdBanner;
