import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { setCategory } from "../../../../infrastructure/state/slices/productsSlice.js";
import LocationButton from "../../features/location/DeliveryLocationSelector/LocationButton";
import './Header.scss';

function Header() {
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    // Reset category to show all products when clicking logo
    dispatch(setCategory(''));
  };

  return (
    <div className="header">
      {/* Ubicación */}
      <LocationButton />

      {/* Contenido principal del header */}
      <div className="header__content">
        {/* Contenedor del logo */}
        <Link to="/home" className="header__logo-container" onClick={handleLogoClick}>
          <div className="header__logo-wrapper">
            <div className="header__logo-inner">
              <img
                className="header__logo-image"
                src="/licoresbta_logo.svg"
                alt="Licores Bogotá 24 - Licores a domicilio en Bogotá"
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
