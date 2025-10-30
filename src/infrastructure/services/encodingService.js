/**
 * EncodingService - Handles character encoding issues for Spanish text
 * Maps incorrectly encoded characters to their correct UTF-8 equivalents
 */

const CHARACTER_MAP = {
  // Spanish special characters - using Unicode escape sequences
  '\u00C3\u00B1': 'ñ',
  '\u00C3\u0091': 'Ñ',
  '\u00C3\u00A1': 'á',
  '\u00C3\u00A9': 'é',
  '\u00C3\u00AD': 'í',
  '\u00C3\u00B3': 'ó',
  '\u00C3\u00BA': 'ú',
  '\u00C3\u0081': 'Á',
  '\u00C3\u0089': 'É',
  '\u00C3\u008D': 'Í',
  '\u00C3\u0093': 'Ó',
  '\u00C3\u009A': 'Ú',
  '\u00C3\u00BC': 'ü',
  '\u00C3\u009C': 'Ü',

  // Common replacements for Windows-1252 to UTF-8 issues
  '\u00C2\u00B0': '°',
  '\u00C2\u00B4': '´',
  '\u00C2\u00A8': '¨',

  // Specific fixes for product names
  'A\uFFFDEJO': 'AÑEJO',
};

/**
 * Fixes encoding issues in a string by replacing incorrectly encoded characters
 * @param {string} text - The text to fix
 * @returns {string} - The fixed text
 */
export const fixEncoding = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }

  let fixedText = text;

  // Apply character replacements
  Object.entries(CHARACTER_MAP).forEach(([wrong, correct]) => {
    fixedText = fixedText.replace(new RegExp(wrong, 'g'), correct);
  });

  // Fix the replacement character � (U+FFFD) when followed by specific patterns
  fixedText = fixedText.replace(/�/g, (match, offset, string) => {
    // Check context to determine the correct character
    const before = string.substring(Math.max(0, offset - 2), offset);
    const after = string.substring(offset + 1, Math.min(string.length, offset + 3));

    // Common patterns
    if (before.match(/[AEIOUaeiou]/) && after.match(/[A-Z]/)) {
      return 'Ñ';
    }
    if (before.match(/[AEIOUaeiou]/) && after.match(/[a-z]/)) {
      return 'ñ';
    }

    // Default: try to infer from common Spanish words
    if (string.includes('A�EJO')) return 'Ñ';
    if (string.includes('A�O')) return 'Ñ';
    if (string.includes('ESPA�OL')) return 'Ñ';

    return match; // Keep original if we can't determine
  });

  return fixedText;
};

/**
 * Fixes encoding issues in an object's string properties
 * @param {Object} obj - The object to fix
 * @returns {Object} - The object with fixed string properties
 */
export const fixObjectEncoding = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const fixed = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'string') {
      fixed[key] = fixEncoding(value);
    } else if (typeof value === 'object' && value !== null) {
      fixed[key] = fixObjectEncoding(value);
    } else {
      fixed[key] = value;
    }
  });

  return fixed;
};
