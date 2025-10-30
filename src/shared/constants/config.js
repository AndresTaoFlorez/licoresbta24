/**
 * Application Configuration Constants
 * Centralized configuration values
 */

/**
 * Default location
 */
export const DEFAULT_LOCATION = 'Bogotá';

/**
 * Age verification unlock duration (15 minutes)
 */
export const UNLOCK_DURATION = 15 * 60 * 1000;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  LOCATION: 'location',
  UNLOCK: 'swipeToEnterUnlocked',
};

/**
 * CSV parsing configuration
 */
export const CSV_CONFIG = {
  DELIMITER: ';',
  ENCODING_PRIMARY: 'windows-1252',
  ENCODING_FALLBACK: 'utf-8',
};

/**
 * Phone numbers
 */
export const CONTACT = {
  WHATSAPP: '3133978710',
};

/**
 * Product data source
 */
export const DATA_SOURCE = {
  PRODUCTS_CSV: '/products.csv',
};
