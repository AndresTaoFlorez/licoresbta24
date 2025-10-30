import { Product } from '../../domain/entities/Product.js';

/**
 * ProductMapper
 * Maps between different data representations
 * Transforms between raw data, domain entities, and DTOs
 */

/**
 * Map raw CSV data to Product entity
 * @param {Object} rawData - Raw product data from CSV
 * @returns {Product} Product entity
 */
export const toEntity = (rawData) => {
  return Product.from(rawData);
};

/**
 * Map Product entity to plain object for Redux/API
 * @param {Product} product - Product entity
 * @returns {Object} Plain object
 */
export const toObject = (product) => {
  if (product instanceof Product) {
    return product.toObject();
  }

  // If it's already an object, return as-is
  return product;
};

/**
 * Map array of raw data to Product entities
 * @param {Object[]} rawDataArray - Array of raw product data
 * @returns {Product[]} Array of Product entities
 */
export const toEntityArray = (rawDataArray) => {
  return Product.fromArray(rawDataArray);
};

/**
 * Map array of Product entities to plain objects
 * @param {Product[]} products - Array of Product entities
 * @returns {Object[]} Array of plain objects
 */
export const toObjectArray = (products) => {
  return products.map(toObject);
};

/**
 * Transform products map to array
 * @param {Object} productsMap - Products map with product name as key
 * @returns {Object[]} Array of products
 */
export const mapToArray = (productsMap) => {
  return Object.values(productsMap);
};

/**
 * Transform products array to map
 * @param {Object[]} productsArray - Array of products
 * @param {string} keyField - Field to use as key (default: 'PRODUCTO')
 * @returns {Object} Products map
 */
export const arrayToMap = (productsArray, keyField = 'PRODUCTO') => {
  const map = {};

  productsArray.forEach((product, index) => {
    const key = product[keyField] || `item_${index}`;
    map[key] = product;
  });

  return map;
};

/**
 * Create a product DTO for display
 * @param {Object} product - Product object
 * @returns {Object} Display DTO with formatted fields
 */
export const toDisplayDTO = (product) => {
  return {
    name: product.PRODUCTO,
    photo: product.FOTO,
    brand: product.MARCA,
    size: product.MEDIDA,
    category: product.CATEGORIA,
    price: product.PRECIO,
    description: product.DESCRIPCION || '',
  };
};
