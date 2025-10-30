/**
 * Product Validator
 * Centralized validation rules for products
 * Business rules that determine what makes a valid product
 */

/**
 * Excluded categories that should not be displayed
 */
const EXCLUDED_CATEGORIES = ['CIGARRILLOS'];

/**
 * Check if product has a valid photo
 * @param {Object} product - Raw product data
 * @returns {boolean}
 */
export const hasValidPhoto = (product) => {
  return product.FOTO && product.FOTO.trim() !== '';
};

/**
 * Check if product category is allowed
 * @param {Object} product - Raw product data
 * @returns {boolean}
 */
export const isAllowedCategory = (product) => {
  if (!product.CATEGORIA) return false;

  const category = product.CATEGORIA.trim().toUpperCase();
  return !EXCLUDED_CATEGORIES.includes(category);
};

/**
 * Check if product has a valid name
 * @param {Object} product - Raw product data
 * @returns {boolean}
 */
export const hasValidName = (product) => {
  return product.PRODUCTO && product.PRODUCTO.trim() !== '';
};

/**
 * Check if product has a valid price
 * @param {Object} product - Raw product data
 * @returns {boolean}
 */
export const hasValidPrice = (product) => {
  if (!product.PRECIO) return false;

  // Try to parse the price
  const priceStr = String(product.PRECIO).replace(/,/g, '');
  const price = Number(priceStr);

  return !isNaN(price) && price > 0;
};

/**
 * Validate if a product should be displayed
 * Combines all validation rules
 * @param {Object} product - Raw product data
 * @returns {boolean}
 */
export const isValidProduct = (product) => {
  return hasValidPhoto(product) &&
         isAllowedCategory(product) &&
         hasValidName(product);
};

/**
 * Validate multiple products and return only valid ones
 * @param {Object[]} products - Array of raw product data
 * @returns {Object[]}
 */
export const filterValidProducts = (products) => {
  if (!Array.isArray(products)) {
    return [];
  }

  return products.filter(isValidProduct);
};

/**
 * Get validation errors for a product
 * Useful for debugging or error reporting
 * @param {Object} product - Raw product data
 * @returns {string[]} Array of error messages
 */
export const getValidationErrors = (product) => {
  const errors = [];

  if (!hasValidPhoto(product)) {
    errors.push('Product must have a valid photo');
  }

  if (!isAllowedCategory(product)) {
    errors.push('Product category is not allowed or missing');
  }

  if (!hasValidName(product)) {
    errors.push('Product must have a valid name');
  }

  if (!hasValidPrice(product)) {
    errors.push('Product must have a valid price greater than 0');
  }

  return errors;
};
