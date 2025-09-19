import Papa from "papaparse";

export const getProducts = async () => {
  const res = await fetch("/products.csv");
  const buffer = await res.arrayBuffer();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(buffer);

  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      delimiter: ";",
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toUpperCase(),
      complete: (result) => {
        try {
          const filtered = result.data
            .filter((item) => item.FOTO && item.FOTO.trim() !== "")
            .filter((item) => item.CATEGORIA !== "CIGARRILLOS")
            .map((item) => {
              // PRICE format
              let precioFormateado = item.PRECIO
                ? Number(item.PRECIO.replace(/,/g, "")).toLocaleString("es-CO")
                : item.PRECIO;
              return {
                ...item,
                CATEGORIA: item.CATEGORIA ? item.CATEGORIA.trim() : "",
                PRECIO: precioFormateado,
              };
            });

          const map = {};
          filtered.forEach((item, index) => {
            const key = item.PRODUCTO || `item_${index}`;
            map[key] = item;
          });

          resolve(map); // ✅ resolve the Promise
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
};