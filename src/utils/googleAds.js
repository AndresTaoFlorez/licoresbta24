/**
 * Google Ads utilities for tracking conversions and events
 * Replace CONVERSION_ID and CONVERSION_LABEL with actual values from Google Ads
 */

/**
 * Track a conversion event
 * @param {string} conversionId - Your Google Ads conversion ID (e.g., 'AW-XXXXXXXXXX')
 * @param {string} conversionLabel - The conversion label
 * @param {number} value - Optional conversion value
 * @param {string} currency - Currency code (default: 'COP')
 */
export const trackConversion = (conversionId, conversionLabel, value = 0, currency = 'COP') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `${conversionId}/${conversionLabel}`,
      'value': value,
      'currency': currency
    });
  }
};

/**
 * Track a purchase conversion
 * @param {number} orderValue - Total order value
 * @param {string} orderId - Unique order ID
 */
export const trackPurchase = (orderValue, orderId) => {
  const conversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
  const conversionLabel = import.meta.env.VITE_GOOGLE_ADS_PURCHASE_LABEL;

  if (conversionId && conversionLabel) {
    trackConversion(conversionId, conversionLabel, orderValue, 'COP');

    // Also track as a custom event
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        'transaction_id': orderId,
        'value': orderValue,
        'currency': 'COP'
      });
    }
  }
};

/**
 * Track when user views contact information (phone number click)
 */
export const trackContactView = () => {
  const conversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
  const conversionLabel = import.meta.env.VITE_GOOGLE_ADS_CONTACT_LABEL;

  if (conversionId && conversionLabel) {
    trackConversion(conversionId, conversionLabel);
  }
};

/**
 * Track when user adds item to cart
 * @param {string} productName - Name of the product
 * @param {number} productValue - Value of the product
 */
export const trackAddToCart = (productName, productValue) => {
  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      'items': [{
        'item_name': productName,
        'price': productValue
      }],
      'value': productValue,
      'currency': 'COP'
    });
  }
};

/**
 * Track page view
 * @param {string} pageTitle - Title of the page
 * @param {string} pagePath - Path of the page
 */
export const trackPageView = (pageTitle, pagePath) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      'page_title': pageTitle,
      'page_path': pagePath
    });
  }
};
