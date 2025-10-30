import { useDispatch, useSelector } from "react-redux";
import { openLocationModal } from "../../store/slices/locationSlice";
import { Link } from "react-router";
import { MapPin } from "lucide-react";

function Header() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.current);

  const handleOpenModal = () => {
    dispatch(openLocationModal());
  };

  return (
    <div className="header">
      {/* Ubicación */}
      <div onClick={handleOpenModal} className="header__location">
        <button
          aria-label="Seleccionar ubicación de entrega"
          title="Seleccionar ubicación de entrega"
          className="header__location-button"
        >
          <MapPin />
          <span>{location}</span>
        </button>
      </div>

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
