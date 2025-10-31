import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setLocation, closeLocationModal } from "../../../../../infrastructure/state/slices/locationSlice.js";
import locations from "../../../../../infrastructure/data/locations.json";
import "./DeliveryLocationSelector.scss";

const DeliveryLocationSelector = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const modalRef = useRef(null);

  const onSubmit = () => {
    if (selected) {
      dispatch(setLocation(selected));
      dispatch(closeLocationModal());
    }
  };

  // Desactivar scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Cerrar al hacer clic fuera del modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(closeLocationModal());
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  // Filtrar departamentos y ciudades
  const filteredLocations = locations.locations
    .map((dept) => {
      const matchDept = dept.departamento
        .toLowerCase()
        .includes(search.toLowerCase());
      const filteredCities = dept.ciudades.filter((c) =>
        c.toLowerCase().includes(search.toLowerCase())
      );
      return {
        ...dept,
        ciudades: matchDept ? dept.ciudades : filteredCities,
      };
    })
    .filter((d) => d.ciudades.length > 0);

  return (
    <div className="delivery-location-modal">
      <div ref={modalRef} className="delivery-location-modal__card">
        <button
          onClick={() => dispatch(closeLocationModal())}
          className="delivery-location-modal__close-btn"
        >
          ✕
        </button>

        <h2 className="delivery-location-modal__subtitle">
          CONFIRMA LUGAR DE ENTREGA
        </h2>
        <h1 className="delivery-location-modal__title">
          Nuestros precios de envío varían según el lugar de entrega
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="delivery-location-modal__form">
          <input
            type="text"
            placeholder="Buscar..."
            className="delivery-location-modal__search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="delivery-location-modal__list">
            {filteredLocations.map((dept) => (
              <div key={dept.departamento}>
                <p className="delivery-location-modal__department">
                  {dept.departamento}
                </p>
                {dept.ciudades.map((city) => {
                  const isSelected = selected === `${dept.departamento} - ${city}`;
                  return (
                    <div
                      key={city}
                      onClick={() => setSelected(`${dept.departamento} - ${city}`)}
                      className={`delivery-location-modal__city ${isSelected ? 'delivery-location-modal__city--selected' : ''}`}
                    >
                      {city}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <button type="submit" className="delivery-location-modal__submit-btn">
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryLocationSelector;


