import { trackPhoneCall, trackWhatsAppClick } from '../../../utils/googleAds.js';

export const handleContactClick = (phoneNumber = 0, isCall = false) => {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (isMobile && !isCall) {
    // Llamar directamente en móvil
    trackPhoneCall(phoneNumber);
    window.location.href = `tel:${phoneNumber}`;
  } else {
    // Abrir WhatsApp Web en escritorio
    trackWhatsAppClick(phoneNumber);
    window.open(`https://wa.me/57${phoneNumber}`, "_blank");
  }
};
