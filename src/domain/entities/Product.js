import { Price } from '../valueObjects/Price.js';
import { Category } from '../valueObjects/Category.js';

/**
 * Product Entity
 * Represents a product with business rules and validation
 */

export class Product {
  constructor(data) {
    this.raw = data;
    this.producto = data.PRODUCTO || '';
    this.foto = data.FOTO || '';
    this.marca = data.MARCA || '';
    this.medida = data.MEDIDA || '';

    // Value objects
    this.category = Category.from(data.CATEGORIA || '');
    this.price = Price.from(data.PRECIO || 0);

    // Additional fields
    this.descripcion = data.DESCRIPCION || '';
    this.stock = data.STOCK || 0;
  }

  /**
   * Get product name
   * @returns {string}
   */
  getName() {
    return this.producto;
  }

  /**
   * Get product photo URL
   * @returns {string}
   */
  getPhoto() {
    return this.foto;
  }

  /**
   * Get brand
   * @returns {string}
   */
  getBrand() {
    return this.marca;
  }

  /**
   * Get size/measurement
   * @returns {string}
   */
  getSize() {
    return this.medida;
  }

  /**
   * Get category
   * @returns {Category}
   */
  getCategory() {
    return this.category;
  }

  /**
   * Get price
   * @returns {Price}
   */
  getPrice() {
    return this.price;
  }

  /**
   * Get formatted price for display
   * @returns {string}
   */
  getFormattedPrice() {
    return this.price.getFormatted();
  }

  /**
   * Get category display name
   * @returns {string}
   */
  getCategoryDisplay() {
    return this.category.getDisplay();
  }

  /**
   * Check if product has a valid photo
   * @returns {boolean}
   */
  hasPhoto() {
    return this.foto && this.foto.trim() !== '';
  }

  /**
   * Check if product has a valid price
   * @returns {boolean}
   */
  hasValidPrice() {
    return this.price.isValid();
  }

  /**
   * Check if product is valid for display
   * Business rules: Must have photo and not be in excluded categories
   * @returns {boolean}
   */
  isValid() {
    return this.hasPhoto() &&
           this.category.getNormalized() !== 'CIGARRILLOS' &&
           this.producto.trim() !== '';
  }

  /**
   * Check if product matches a category
   * @param {string} categoryName - Category name to match
   * @returns {boolean}
   */
  matchesCategory(categoryName) {
    if (!categoryName) return true;
    return this.category.getNormalized() === categoryName.toUpperCase();
  }

  /**
   * Check if product matches search term
   * @param {string} searchTerm - Search term
   * @returns {boolean}
   */
  matchesSearch(searchTerm) {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();
    return this.producto.toLowerCase().includes(term) ||
           this.marca.toLowerCase().includes(term) ||
           this.category.getDisplay().toLowerCase().includes(term);
  }

  /**
   * Convert to plain object for Redux/API
   * @returns {Object}
   */
  toObject() {
    return {
      PRODUCTO: this.producto,
      FOTO: this.foto,
      MARCA: this.marca,
      MEDIDA: this.medida,
      CATEGORIA: this.category.getNormalized(),
      PRECIO: this.price.getFormatted(),
      DESCRIPCION: this.descripcion,
      STOCK: this.stock,
    };
  }

  /**
   * Create Product from raw data
   * @param {Object} data - Raw product data
   * @returns {Product}
   */
  static from(data) {
    return new Product(data);
  }

  /**
   * Create multiple Products from array
   * @param {Object[]} dataArray - Array of raw product data
   * @returns {Product[]}
   */
  static fromArray(dataArray) {
    if (!Array.isArray(dataArray)) {
      return [];
    }

    return dataArray.map(data => Product.from(data));
  }

  /**
   * Filter valid products
   * @param {Product[]} products - Array of Product instances
   * @returns {Product[]}
   */
  static filterValid(products) {
    return products.filter(product => product.isValid());
  }
}
