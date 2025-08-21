import { useEffect } from "react";
import { useLocation } from "../context/context";
import Papa from "papaparse";

export default function useProducts() {
  const { products, setProducts, categories } = useLocation();

  useEffect(() => {
    fetch("/products.csv")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(buffer);

        Papa.parse(csv, {
          delimiter: ";",
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().toUpperCase(),
          complete: (result) => {
            const filtered = result.data
              .filter((item) => item.FOTO && item.FOTO.trim() !== "")
              .filter((item) => item.CATEGORIA !== "CIGARRILLOS")
              .map((item) => {
                // formatear PRECIO con punto de mil
                let precioFormateado = item.PRECIO
                  ? Number(item.PRECIO.replace(/,/g, "")).toLocaleString("es-CO")
                  : item.PRECIO;

                return {
                  ...item,
                  CATEGORIA: item.CATEGORIA ? item.CATEGORIA.trim() : "",
                  PRECIO: precioFormateado,
                };
              });

            // mapeo a objeto con key = PRODUCTO
            const map = {};
            filtered.forEach((item, index) => {
              const key = item.PRODUCTO || `item_${index}`;
              map[key] = item;
            });

            setProducts(map); // guardamos todos los productos en el contexto
          },
        });
      });
  }, [setProducts]);

  // productos filtrados (sin tocar el estado global)
  const productsFiltered =
    categories && categories.length > 0
      ? Object.values(products).filter(
          (item) => item.CATEGORIA === categories
        )
      : Object.values(products);

  return { productsFiltered, allProducts: products };
}
