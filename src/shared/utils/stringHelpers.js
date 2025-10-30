/**
 * String Helper Utilities
 * Common string manipulation functions
 */

/**
 * Capitalize first letter of each word
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length === 0) {
    return '';
  }

  const words = str.split(' ');
  const capitalizedWords = words.map(word => {
    if (word.length === 0) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(' ');
};

/**
 * Capitalize first letter of string
 * @param {string} str - Input string
 * @returns {string} Capitalized string
 */
export const capitalizeFirst = (str) => {
  if (!str || typeof str !== 'string' || str.length === 0) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to uppercase
 * @param {string} str - Input string
 * @returns {string} Uppercase string
 */
export const toUpperCase = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.toUpperCase();
};

/**
 * Convert string to lowercase
 * @param {string} str - Input string
 * @returns {string} Lowercase string
 */
export const toLowerCase = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.toLowerCase();
};

/**
 * Trim whitespace from string
 * @param {string} str - Input string
 * @returns {string} Trimmed string
 */
export const trim = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.trim();
};

/**
 * Normalize string (trim and uppercase)
 * @param {string} str - Input string
 * @returns {string} Normalized string
 */
export const normalize = (str) => {
  return toUpperCase(trim(str));
};

/**
 * Check if string is empty or whitespace
 * @param {string} str - Input string
 * @returns {boolean} True if empty/whitespace
 */
export const isEmpty = (str) => {
  return !str || typeof str !== 'string' || str.trim().length === 0;
};

/**
 * Truncate string to max length with ellipsis
 * @param {string} str - Input string
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncate = (str, maxLength) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength - 3) + '...';
};
