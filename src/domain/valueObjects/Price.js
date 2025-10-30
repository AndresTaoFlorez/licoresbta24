/**
 * Price Value Object
 * Encapsulates price parsing, validation, and formatting logic
 * Ensures consistent price handling across the application
 */

export class Price {
  constructor(rawPrice) {
    this.raw = rawPrice;
    this.value = this.parse(rawPrice);
    this.formatted = this.format(this.value);
  }

  /**
   * Parse raw price string to number
   * Handles comma separators and string formats
   * @param {string|number} raw - Raw price value
   * @returns {number} Parsed numeric price
   */
  parse(raw) {
    if (typeof raw === 'number') {
      return raw;
    }

    if (typeof raw === 'string') {
      // Remove commas and parse
      const cleaned = raw.replace(/,/g, '');
      const parsed = Number(cleaned);

      if (isNaN(parsed)) {
        console.warn(`Invalid price value: ${raw}`);
        return 0;
      }

      return parsed;
    }

    return 0;
  }

  /**
   * Format price for display in Colombian format
   * @param {number} value - Numeric price value
   * @returns {string} Formatted price string
   */
  format(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      return '0';
    }

    return value.toLocaleString('es-CO');
  }

  /**
   * Get the numeric value
   * @returns {number}
   */
  getValue() {
    return this.value;
  }

  /**
   * Get the formatted string
   * @returns {string}
   */
  getFormatted() {
    return this.formatted;
  }

  /**
   * Compare with another price
   * @param {Price} other - Another Price instance
   * @returns {number} -1 if less, 0 if equal, 1 if greater
   */
  compareTo(other) {
    if (this.value < other.value) return -1;
    if (this.value > other.value) return 1;
    return 0;
  }

  /**
   * Check if price is valid (greater than 0)
   * @returns {boolean}
   */
  isValid() {
    return this.value > 0;
  }

  /**
   * Create Price from raw value
   * @param {string|number} rawPrice - Raw price value
   * @returns {Price}
   */
  static from(rawPrice) {
    return new Price(rawPrice);
  }
}
