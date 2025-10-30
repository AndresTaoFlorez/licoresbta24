import Papa from "papaparse";
import { fixEncoding } from "../services/encodingService.js";
import { Product } from "../../domain/entities/Product.js";
import { Price } from "../../domain/valueObjects/Price.js";
import { isValidProduct } from "../../domain/validators/productValidator.js";

/**
 * ProductRepository - Handles product data fetching and parsing
 * Centralizes CSV parsing logic with encoding fixes
 * Uses domain entities for business logic
 */

export const getProducts = async () => {
  const res = await fetch("/products.csv");
  const buffer = await res.arrayBuffer();

  // Try multiple encoding strategies
  let csv;
  try {
    // First try Windows-1252 (common for Spanish CSV files)
    const decoder = new TextDecoder("windows-1252");
    csv = decoder.decode(buffer);
  } catch {
    // Fallback to UTF-8
    const decoder = new TextDecoder("utf-8");
    csv = decoder.decode(buffer);
  }

  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      delimiter: ";",
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toUpperCase(),
      complete: (result) => {
        try {
          const processed = result.data
            // Apply encoding fixes first
            .map((item) => ({
              ...item,
              PRODUCTO: fixEncoding(item.PRODUCTO || ""),
              CATEGORIA: fixEncoding(item.CATEGORIA ? item.CATEGORIA.trim() : ""),
            }))
            // Validate using domain rules
            .filter(isValidProduct)
            // Format price using domain value object
            .map((item) => {
              const price = Price.from(item.PRECIO);
              return {
                ...item,
                PRECIO: price.getFormatted(),
              };
            });

          // Convert to map with product name as key
          const map = {};
          processed.forEach((item, index) => {
            const key = item.PRODUCTO || `item_${index}`;
            map[key] = item;
          });

          resolve(map);
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(err),
    });
  });
};
