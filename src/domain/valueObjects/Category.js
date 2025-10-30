/**
 * Category Value Object
 * Encapsulates category business logic like formatting, sorting, and validation
 */

export class Category {
  constructor(name) {
    this.raw = name;
    this.normalized = this.normalize(name);
    this.display = this.formatForDisplay(this.normalized);
  }

  /**
   * Normalize category name (trim, uppercase)
   * @param {string} name - Raw category name
   * @returns {string} Normalized category name
   */
  normalize(name) {
    if (!name || typeof name !== 'string') {
      return '';
    }

    return name.trim().toUpperCase();
  }

  /**
   * Format category for display (capitalize first letter of each word)
   * @param {string} name - Normalized category name
   * @returns {string} Display-friendly category name
   */
  formatForDisplay(name) {
    if (!name || typeof name !== 'string') {
      return '';
    }

    if (name.length === 0) {
      return '';
    }

    const words = name.split(' ');
    const capitalizedWords = words.map(word => {
      if (word.length === 0) {
        return '';
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return capitalizedWords.join(' ');
  }

  /**
   * Get normalized category name
   * @returns {string}
   */
  getNormalized() {
    return this.normalized;
  }

  /**
   * Get display-friendly category name
   * @returns {string}
   */
  getDisplay() {
    return this.display;
  }

  /**
   * Check if this is the "OTROS" category (should be sorted last)
   * @returns {boolean}
   */
  isOtros() {
    return this.normalized === 'OTROS';
  }

  /**
   * Compare two categories for sorting
   * Business rule: "OTROS" always comes last, others sorted alphabetically
   * @param {Category} other - Another Category instance
   * @returns {number} -1 if this comes first, 1 if other comes first, 0 if equal
   */
  compareTo(other) {
    // "OTROS" always goes last
    if (this.isOtros() && !other.isOtros()) return 1;
    if (!this.isOtros() && other.isOtros()) return -1;

    // Alphabetical comparison
    return this.normalized.localeCompare(other.normalized);
  }

  /**
   * Check if category matches a search term
   * @param {string} searchTerm - Search term
   * @returns {boolean}
   */
  matches(searchTerm) {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();
    return this.normalized.toLowerCase().includes(term);
  }

  /**
   * Create Category from raw name
   * @param {string} name - Raw category name
   * @returns {Category}
   */
  static from(name) {
    return new Category(name);
  }

  /**
   * Sort an array of categories according to business rules
   * @param {Category[]} categories - Array of Category instances
   * @returns {Category[]} Sorted array
   */
  static sort(categories) {
    return categories.sort((a, b) => a.compareTo(b));
  }

  /**
   * Extract unique categories from products
   * @param {Object[]} products - Array of product objects
   * @returns {Category[]} Array of unique Category instances, sorted
   */
  static fromProducts(products) {
    if (!Array.isArray(products)) {
      return [];
    }

    const categoryNames = new Set();

    products.forEach(product => {
      if (product.CATEGORIA) {
        categoryNames.add(product.CATEGORIA);
      }
    });

    const categories = Array.from(categoryNames).map(name => Category.from(name));

    return Category.sort(categories);
  }
}
