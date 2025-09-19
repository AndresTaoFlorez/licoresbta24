import { Phone, Instagram } from 'lucide-react';
import { handleContactClick } from '../../shared/components/WhatsAppButton.jsx';
import { FaTiktok } from 'react-icons/fa';
import '../styles/footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <section className="footer-social-contact">
          <div className="footer-social">
            <div className="footer-social-text">
              <p>Conéctate con nosotros y descubre ofertas exclusivas</p>
            </div>
            <div className="footer-social-icons">
              <a
                href="https://www.instagram.com/licoresbogota24_"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <Instagram className="social-icon" />
              </a>
              <a
                href="https://www.tiktok.com/@licoresbogota247"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link tiktok"
              >
                <FaTiktok className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-contact">
            <div className="contact-content">
              <h2>Contáctanos</h2>
              <div className="contact-info">
                <div className="contact-call">
                  ¡Llámanos ya! <Phone className="phone-icon" />
                </div>
                <div className="contact-numbers">
                  <button
                    onClick={() => handleContactClick("3133978710")}
                  >
                    313 3978710
                  </button>
                  <button
                    onClick={() => handleContactClick("3114575986")}
                  >
                    311 4575936
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="footer-warning">
          El consumo de bebidas debe realizarse de manera responsable y únicamente por personas en edad legal para hacerlo.
          Disfruta con moderación y cuida de ti y de los tuyos.
        </div>

        <div className="footer-payments">
          <div className="footer-payments-container">
            <div className="payment-logos">
              <img src="/nequi.svg" alt="Nequi" />
              <img src="/daviplata.svg" alt="Daviplata" />
              <img src="/visa.svg" alt="Visa" />
              <img src="/mastercard.svg" alt="MasterCard" />
              <img src="/maestro.svg" alt="Maestro" />
            </div>
          </div>
        </div>

        <div className="footer-rights">
          © {new Date().getFullYear()} Bogotá 24. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
