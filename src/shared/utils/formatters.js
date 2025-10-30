/**
 * Formatter Utilities
 * Common formatting functions for display
 */

/**
 * Format number as Colombian currency
 * @param {number} value - Numeric value
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '$0';
  }

  return `$${value.toLocaleString('es-CO')}`;
};

/**
 * Format number with Colombian locale
 * @param {number} value - Numeric value
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }

  return value.toLocaleString('es-CO');
};

/**
 * Parse string to number, removing commas
 * @param {string|number} value - Value to parse
 * @returns {number} Parsed number
 */
export const parseNumber = (value) => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const cleaned = value.replace(/,/g, '');
    const parsed = Number(cleaned);

    if (isNaN(parsed)) {
      return 0;
    }

    return parsed;
  }

  return 0;
};

/**
 * Format date to Colombian locale
 * @param {Date|string|number} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-CO');
  } catch {
    return '';
  }
};

/**
 * Format date and time to Colombian locale
 * @param {Date|string|number} date - Date to format
 * @returns {string} Formatted date/time string
 */
export const formatDateTime = (date) => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('es-CO');
  } catch {
    return '';
  }
};

/**
 * Format percentage
 * @param {number} value - Numeric value (0-1 or 0-100)
 * @param {boolean} isDecimal - If true, value is 0-1; if false, value is 0-100
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, isDecimal = true) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%';
  }

  const percentage = isDecimal ? value * 100 : value;
  return `${percentage.toFixed(1)}%`;
};
