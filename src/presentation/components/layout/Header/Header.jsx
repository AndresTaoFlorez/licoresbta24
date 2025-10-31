import { Link } from "react-router";
import LocationButton from "../../features/location/DeliveryLocationSelector/LocationButton";
import './Header.scss';

function Header() {
  return (
    <div className="header">
      {/* Ubicación */}
      <LocationButton />

      {/* Contenido principal del header */}
      <div className="header__content">
        {/* Contenedor del logo */}
        <Link to="/home" className="header__logo-container">
          <div className="header__logo-wrapper">
            <div className="header__logo-inner">
              <img
                className="header__logo-image"
                src="/licoresbta_logo.svg"
                alt="licoresbta_logo"
              />

              <div className="header__tagline">
                <p>Siempre listos para tus mejores momentos</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Header
