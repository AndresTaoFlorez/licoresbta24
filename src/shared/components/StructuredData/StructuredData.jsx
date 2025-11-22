import { useEffect } from 'react';

/**
 * StructuredData - Componente que inyecta datos estructurados (Schema.org)
 * para mejorar el SEO y la presencia en búsquedas locales de Google
 */
const StructuredData = () => {
  useEffect(() => {
    // Datos estructurados para LocalBusiness
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://licoresbta24.com/#business",
      "name": "Licores Bogotá 24",
      "alternateName": "LicoresBTA24",
      "description": "Servicio de licores, cervezas, whisky, ron, vodka, tequila, vino y más a domicilio en Bogotá. Disponible las 24 horas.",
      "url": "https://licoresbta24.com",
      "logo": "https://licoresbta24.com/licoresbta_logo.svg",
      "image": "https://licoresbta24.com/licoresbta_logo.svg",
      "telephone": "+57-313-3978710",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bogotá",
        "addressRegion": "Bogotá D.C.",
        "addressCountry": "CO"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "4.60971",
        "longitude": "-74.08175"
      },
      "areaServed": {
        "@type": "City",
        "name": "Bogotá"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://www.instagram.com/licoresbogota24_",
        "https://www.tiktok.com/@licoresbogota247"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+57-313-3978710",
          "contactType": "customer service",
          "areaServed": "CO",
          "availableLanguage": "Spanish"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+57-311-4575936",
          "contactType": "customer service",
          "areaServed": "CO",
          "availableLanguage": "Spanish"
        }
      ],
      "potentialAction": {
        "@type": "OrderAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://wa.me/573133978710",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    };

    // Datos estructurados para el sitio web
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://licoresbta24.com/#website",
      "url": "https://licoresbta24.com",
      "name": "Licores Bogotá 24",
      "description": "Licores a domicilio en Bogotá las 24 horas",
      "publisher": {
        "@id": "https://licoresbta24.com/#business"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://licoresbta24.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Organización
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://licoresbta24.com/#organization",
      "name": "Licores Bogotá 24",
      "url": "https://licoresbta24.com",
      "logo": "https://licoresbta24.com/licoresbta_logo.svg",
      "sameAs": [
        "https://www.instagram.com/licoresbogota24_",
        "https://www.tiktok.com/@licoresbogota247"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+57-313-3978710",
        "contactType": "customer service",
        "areaServed": "CO",
        "availableLanguage": "Spanish"
      }
    };

    // Crear el script con todos los schemas
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@graph": [localBusinessSchema, websiteSchema, organizationSchema]
    });
    script.id = 'structured-data-schema';

    // Verificar si ya existe y eliminarlo
    const existingScript = document.getElementById('structured-data-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // Agregar el nuevo script
    document.head.appendChild(script);

    // Cleanup
    return () => {
      const scriptToRemove = document.getElementById('structured-data-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null; // Este componente no renderiza nada
};

export default StructuredData;
