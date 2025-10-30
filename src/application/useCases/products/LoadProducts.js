import { getProducts } from '../../../infrastructure/repositories/ProductRepository.js';

/**
 * LoadProducts Use Case
 * Orchestrates the product loading process
 * Coordinates between repository and domain logic
 */

/**
 * Load all products from data source
 * @returns {Promise<Object>} Products map
 */
export const loadProducts = async () => {
  try {
    const products = await getProducts();
    return products;
  } catch (error) {
    console.error('Failed to load products:', error);
    throw new Error('Could not load products. Please try again later.');
  }
};

/**
 * Load products and get additional metadata
 * @returns {Promise<{products: Object, metadata: Object}>}
 */
export const loadProductsWithMetadata = async () => {
  try {
    const products = await getProducts();

    const metadata = {
      totalCount: Object.keys(products).length,
      categories: new Set(Object.values(products).map(p => p.CATEGORIA)).size,
      loadedAt: new Date().toISOString(),
    };

    return {
      products,
      metadata,
    };
  } catch (error) {
    console.error('Failed to load products with metadata:', error);
    throw new Error('Could not load products. Please try again later.');
  }
};

/**
 * Reload products (useful for refresh functionality)
 * @returns {Promise<Object>} Products map
 */
export const reloadProducts = async () => {
  // Could add cache clearing logic here if needed
  return loadProducts();
};
