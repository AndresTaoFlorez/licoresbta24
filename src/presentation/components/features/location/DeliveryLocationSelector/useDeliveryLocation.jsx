import { useSelector } from "react-redux";
import DeliveryLocationSelector from "./DeliveryLocationSelector.jsx";

// Hook para controlar desde fuera
export function useDeliveryLocation() {
  const isOpen = useSelector((state) => state.location.isModalOpen);

  // Modal solo se renderiza si isOpen es true
  const Modal = () => isOpen ? <DeliveryLocationSelector /> : null;

  return { Modal };
}
