import { useForm } from "react-hook-form";
import { useState } from "react";

const DeliveryLocationSelector = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: { location: "bogota" },
  });

  const [selected, setSelected] = useState("bogota");

  const onSubmit = (data) => {
    setSelected(data.location);
    console.log("Lugar de entrega:", data.location);
  };

  const locations = {
    bogota: [
      "Fontibón",
      "Chapinero",
      "Suba",
      "Usaquén",
      "Kennedy",
      "Engativá",
      "Teusaquillo",
      "Centro",
      "Sur",
      "Norte",
    ],
    cundinamarca: ["Soacha"],
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <h2 className="text-gray-500 text-sm font-semibold">
          CONFIRMA LUGAR DE ENTREGA
        </h2>
        <h1 className="text-lg font-bold text-gray-800 mb-4">
          Nuestros precios y envíos varían según el lugar de entrega
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-400"
          />

          <div className="space-y-4 max-h-64 overflow-y-auto">
            {/* Bogotá */}
            <div>
              <p className="text-gray-700 font-semibold mb-2">Bogotá</p>
              {locations.bogota.map((loc) => (
                <label
                  key={loc}
                  className="flex items-center gap-2 py-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={loc}
                    {...register("location")}
                    defaultChecked={loc === "Fontibón"}
                  />
                  <span>{loc}</span>
                </label>
              ))}
            </div>

            {/* Cundinamarca */}
            <div>
              <p className="text-gray-700 font-semibold mb-2">Cundinamarca</p>
              {locations.cundinamarca.map((loc) => (
                <label
                  key={loc}
                  className="flex items-center gap-2 py-1 cursor-pointer"
                >
                  <input type="radio" value={loc} {...register("location")} />
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryLocationSelector;
