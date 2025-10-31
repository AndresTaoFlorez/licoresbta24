import { MapPin } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { openLocationModal } from '../../../../../infrastructure/state/slices/locationSlice';
import './LocationButton.scss';

const LocationButton = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.current);

  const handleOpenModal = () => {
    dispatch(openLocationModal());
  };

  return (
    <div onClick={handleOpenModal} className="location-button">
      <button
        aria-label="Seleccionar ubicación de entrega"
        title="Seleccionar ubicación de entrega"
        className="location-button__btn"
      >
        <MapPin className="location-button__icon" />
        <span className="location-button__text">{location}</span>
      </button>
    </div>
  );
};

export default LocationButton;
