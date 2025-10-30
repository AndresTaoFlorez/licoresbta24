/**
 * FilterProductsByCategory Use Case
 * Business logic for filtering products by category
 * Extracted from Redux slice for better testability and reusability
 */

/**
 * Filter products by category
 * @param {Object} products - Products map with product name as key
 * @param {string} category - Category to filter by (empty string or 'TODOS' returns all)
 * @returns {Object} Filtered products map
 */
export const filterProductsByCategory = (products, category) => {
  // Return all products if no category or 'TODOS'
  if (!category || category === '' || category.toUpperCase() === 'TODOS') {
    return products;
  }

  // Filter products by matching category
  const filtered = {};
  const normalizedCategory = category.toUpperCase();

  Object.entries(products).forEach(([key, product]) => {
    if (product.CATEGORIA && product.CATEGORIA.toUpperCase() === normalizedCategory) {
      filtered[key] = product;
    }
  });

  return filtered;
};

/**
 * Get all unique categories from products
 * @param {Object} products - Products map
 * @returns {string[]} Array of unique category names
 */
export const getUniqueCategories = (products) => {
  const categories = new Set();

  Object.values(products).forEach(product => {
    if (product.CATEGORIA) {
      categories.add(product.CATEGORIA);
    }
  });

  return Array.from(categories);
};

/**
 * Count products in each category
 * @param {Object} products - Products map
 * @returns {Object} Object with category as key and count as value
 */
export const countProductsByCategory = (products) => {
  const counts = {};

  Object.values(products).forEach(product => {
    if (product.CATEGORIA) {
      const category = product.CATEGORIA;
      counts[category] = (counts[category] || 0) + 1;
    }
  });

  return counts;
};
