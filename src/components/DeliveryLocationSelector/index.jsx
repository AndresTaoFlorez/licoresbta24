import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "../../context/context.jsx";
import locations from "./locations.json"; // JSON de ubicaciones

// Hook para controlar desde fuera
export function useDeliveryLocation() {
  const { isOpen } = useLocation();

  const Modal = () =>
    isOpen ? <DeliveryLocationSelector /> : null;

  return { Modal };
}

const DeliveryLocationSelector = () => {
  const { handleSubmit } = useForm();
  const {close, setLocation} = useLocation();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const modalRef = useRef(null);

  const onSubmit = () => {
    console.log("Lugar de entrega:", selected);
    setLocation(selected);
    close(); // Cerrar después de confirmar
  };

  // Cerrar al hacer clic fuera del modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] flex items-center justify-center z-2">
      {/* Card principal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-2xl shadow-xl p-6 mx-4 bg-gradient-to-b from-[#33623d] to-[#141b05]"
      >
        {/* Botón X */}
        <button
          onClick={close}
          className="absolute top-3 right-3 bg-[#33623d] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-green-700 transition"
        >
          ✕
        </button>

        <h2 className="text-green-200 text-sm font-semibold">
          CONFIRMA LUGAR DE ENTREGA
        </h2>
        <h1 className="text-lg font-bold text-green-100 mb-4">
          Nuestros precios de envío varían según el lugar de entrega
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full border border-green-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 bg-[#33623d] text-white placeholder-green-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Lista de ubicaciones */}
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {filteredLocations.map((dept) => (
              <div key={dept.departamento}>
                <p className="text-green-300 font-semibold mb-2">
                  {dept.departamento}
                </p>
                {dept.ciudades.map((city) => (
                  <div
                    key={city}
                    onClick={() => setSelected(`${dept.departamento} - ${city}`)}
                    className={`px-3 py-2 rounded-lg cursor-pointer transition text-green-100 ${selected === `${dept.departamento} - ${city}`
                        ? "bg-green-700 text-white border border-green-400"
                        : "hover:bg-green-800 hover:text-green-200"
                      }`}
                  >
                    {city}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Botón confirmar */}
          <button
            type="submit"
            className="w-full bg-[#33623d] text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryLocationSelector;
