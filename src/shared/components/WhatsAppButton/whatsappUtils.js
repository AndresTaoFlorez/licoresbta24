export const handleContactClick = (phoneNumber = 0, isCall = false) => {
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

  if (isMobile && !isCall) {
    // Llamar directamente en móvil
    window.location.href = `tel:${phoneNumber}`;
  } else {
    // Abrir WhatsApp Web en escritorio
    window.open(`https://wa.me/57${phoneNumber}`, "_blank");
  }
};
