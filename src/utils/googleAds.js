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
 * Track phone call clicks
 * @param {string} phoneNumber - The phone number being called
 */
export const trackPhoneCall = (phoneNumber) => {
  // Track as a general event
  if (window.gtag) {
    window.gtag('event', 'phone_call_click', {
      'event_category': 'engagement',
      'event_label': phoneNumber,
      'phone_number': phoneNumber
    });
  }

  // Also track contact view if label is configured
  trackContactView();
};

/**
 * Track WhatsApp click
 * @param {string} phoneNumber - The phone number for WhatsApp
 */
export const trackWhatsAppClick = (phoneNumber) => {
  if (window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      'event_category': 'engagement',
      'event_label': phoneNumber,
      'phone_number': phoneNumber
    });
  }

  // Also track contact view if label is configured
  trackContactView();
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

/**
 * Track product view (when user sees a product)
 * @param {object} product - The product object
 */
export const trackProductView = (product) => {
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      'event_category': 'engagement',
      'currency': 'COP',
      'value': product.PRECIO || 0,
      'items': [{
        'item_id': product.PRODUCTO || 'unknown',
        'item_name': product.PRODUCTO || 'unknown',
        'item_category': product.CATEGORIA || 'unknown',
        'item_brand': product.MARCA || 'unknown',
        'price': product.PRECIO || 0
      }]
    });
  }
};

/**
 * Track product click (when user clicks on a product)
 * @param {object} product - The product object
 * @param {number} position - Position in the list (optional)
 */
export const trackProductClick = (product, position = 0) => {
  if (window.gtag) {
    window.gtag('event', 'select_item', {
      'event_category': 'engagement',
      'items': [{
        'item_id': product.PRODUCTO || 'unknown',
        'item_name': product.PRODUCTO || 'unknown',
        'item_category': product.CATEGORIA || 'unknown',
        'item_brand': product.MARCA || 'unknown',
        'price': product.PRECIO || 0,
        'index': position
      }]
    });
  }
};

/**
 * Track when user views a list of products
 * @param {array} products - Array of product objects
 * @param {string} listName - Name of the list (e.g., "Search Results", "Category: Whisky")
 */
export const trackProductListView = (products, listName = 'Product List') => {
  if (window.gtag && products && products.length > 0) {
    const items = products.slice(0, 10).map((product, index) => ({
      'item_id': product.PRODUCTO || 'unknown',
      'item_name': product.PRODUCTO || 'unknown',
      'item_category': product.CATEGORIA || 'unknown',
      'item_brand': product.MARCA || 'unknown',
      'price': product.PRECIO || 0,
      'index': index
    }));

    window.gtag('event', 'view_item_list', {
      'event_category': 'engagement',
      'item_list_name': listName,
      'items': items
    });
  }
};
