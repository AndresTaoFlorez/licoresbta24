import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ScrollToTopButton.scss';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isModalOpen = useSelector((state) => state.location.isModalOpen);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-top-button ${isVisible && !isModalOpen ? 'scroll-top-button--visible' : ''}`}
      aria-label="Volver arriba"
    >
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scroll-top-button__icon"
      >
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
      <span className="scroll-top-button__text">Volver arriba</span>
    </button>
  );
};

export default ScrollToTopButton;
