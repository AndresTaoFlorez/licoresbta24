# Guía de Implementación de Google Ads

Esta guía contiene todos los pasos necesarios para configurar Google Ads en el sitio web de Licores BTA 24.

## 📁 Archivos del Proyecto (Ya Creados)

La integración de Google Ads ya está **preparada** en tu proyecto. Los siguientes archivos ya fueron creados/modificados:

### Archivos Modificados:
1. **`index.html`** (línea 49-51)
   - Script de Google Ads agregado en el `<head>`
   - Necesitas reemplazar `ca-pub-XXXXXXXXXXXXXXXX` con tu ID real

2. **`public/ads.txt`** (nuevo archivo)
   - Archivo de verificación de Google Ads
   - Necesitas reemplazar `pub-XXXXXXXXXXXXXXXX` con tu ID real

### Archivos Creados:
3. **`src/utils/googleAds.js`** (nuevo archivo)
   - Funciones de tracking listas para usar:
     - `trackConversion()` - Tracking genérico de conversiones
     - `trackPurchase()` - Tracking de compras
     - `trackContactView()` - Tracking de clicks en contacto/teléfono
     - `trackAddToCart()` - Tracking de agregar al carrito
     - `trackPageView()` - Tracking de vistas de página

### Paquetes Instalados:
4. **`react-google-adsense`** y **`react-adsense`**
   - Librerías de React para Google Ads ya instaladas
   - Listas para usar en componentes

## 📋 Prerequisitos

Antes de comenzar, necesitas:

1. **Cuenta de Google Ads creada**
   - Visita: https://ads.google.com
   - Crea una cuenta si aún no tienes una

2. **ID de Publisher de Google AdSense**
   - Se ve así: `ca-pub-XXXXXXXXXXXXXXXX`
   - Lo encuentras en: Google AdSense → Cuenta → Configuración

3. **IDs de Conversión** (opcional pero recomendado)
   - Para rastrear compras, clics en teléfono, etc.
   - Se configuran en: Google Ads → Herramientas → Conversiones

## 🚀 Pasos de Implementación

### Paso 1: Configurar Variables de Entorno (ÚNICO PASO NECESARIO)

**TODO está automatizado - solo configura las variables de entorno y el sistema hace el resto.**

1. **Copia el archivo de ejemplo:**

   ```bash
   cp .env.example .env
   ```

2. **Edita el archivo `.env` y reemplaza los valores:**

   ```env
   # Google Ads Configuration
   VITE_GOOGLE_ADS_PUBLISHER_ID=ca-pub-1234567890123456  # ← Reemplaza con tu ID real
   VITE_GOOGLE_ADS_CONVERSION_ID=AW-1234567890          # ← Reemplaza con tu ID real
   VITE_GOOGLE_ADS_PURCHASE_LABEL=tu_label_de_compras   # ← Reemplaza con tu label real
   VITE_GOOGLE_ADS_CONTACT_LABEL=tu_label_de_contacto   # ← Reemplaza con tu label real
   ```

3. **¿Qué sucede automáticamente?**
   - ✅ El script de Google Ads se carga automáticamente en el sitio usando `VITE_GOOGLE_ADS_PUBLISHER_ID`
   - ✅ El archivo `ads.txt` se genera automáticamente en el build usando `VITE_GOOGLE_ADS_PUBLISHER_ID`
   - ✅ Las funciones de tracking usan automáticamente los IDs y labels configurados
   - ✅ Si no configuras las variables, el sistema simplemente NO carga Google Ads (sin errores)

4. **IMPORTANTE:**
   - ✅ El archivo `.env` ya está en `.gitignore` - está protegido
   - ⚠️ NUNCA comitees el archivo `.env` al repositorio
   - ✅ Usa `.env.example` para documentar las variables necesarias

### Paso 2: Configurar Variables en Producción (GitHub Actions)

**El archivo `.env` solo funciona en desarrollo local.** Para producción, las variables ya están configuradas en tu GitHub Actions workflow.

#### Configuración de GitHub Secrets (REQUERIDO para producción):

1. **Ve a tu repositorio en GitHub:**
   ```
   https://github.com/TU_USUARIO/TU_REPO
   ```

2. **Navega a Settings:**
   - Click en "Settings" (arriba a la derecha)
   - En el menú izquierdo: "Secrets and variables" → "Actions"

3. **Agrega cada secret (click en "New repository secret"):**

   **Secret 1:**
   - Name: `VITE_GOOGLE_ADS_PUBLISHER_ID`
   - Value: `ca-pub-1234567890123456` (tu ID real)
   - Click "Add secret"

   **Secret 2:**
   - Name: `VITE_GOOGLE_ADS_CONVERSION_ID`
   - Value: `AW-1234567890` (tu ID real)
   - Click "Add secret"

   **Secret 3:**
   - Name: `VITE_GOOGLE_ADS_PURCHASE_LABEL`
   - Value: `tu_label_de_compras` (tu label real)
   - Click "Add secret"

   **Secret 4:**
   - Name: `VITE_GOOGLE_ADS_CONTACT_LABEL`
   - Value: `tu_label_de_contacto` (tu label real)
   - Click "Add secret"

4. **¿Cómo funciona?**
   - Tu archivo `.github/workflows/deploy.yml` ya está configurado
   - En cada deploy, crea un archivo `.env` con estos secrets
   - Vite los lee durante el build
   - Se incrustan en el código compilado
   - **Ya está todo listo - solo agrega los secrets**

5. **Verificar configuración:**
   Después de agregar los secrets, deberías ver 4 secrets listados:
   ```
   VITE_GOOGLE_ADS_PUBLISHER_ID
   VITE_GOOGLE_ADS_CONVERSION_ID
   VITE_GOOGLE_ADS_PURCHASE_LABEL
   VITE_GOOGLE_ADS_CONTACT_LABEL
   ```

#### ⚠️ IMPORTANTE sobre los Secrets:

- ✅ Los secrets son privados - nadie puede verlos
- ✅ Solo se usan durante el build
- ✅ Se incrustan en el código compilado
- ⚠️ Si cambias un secret, necesitas hacer un nuevo deploy (push a main)
- ⚠️ Los secrets vacíos son válidos - el sitio funcionará sin errores

#### Si usas otro hosting (Vercel, Netlify, etc.):

1. **Ve al dashboard de tu proyecto**
2. **Busca "Environment Variables" o "Settings"**
3. **Agrega las mismas 4 variables**
4. **Redeploy tu sitio**

#### Nota sobre Hostinger (tu configuración actual):

Como estás usando **Hostinger con GitHub Actions + FTP Deploy**, el flujo es:

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Push a main                                                  │
│    git push origin main                                         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. GitHub Actions se activa                                     │
│    - Instala dependencias                                       │
│    - Crea .env con secrets (VITE_GOOGLE_ADS_*)                 │
│    - Ejecuta npm run build                                      │
│    - Variables se incrustan en el código compilado              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. FTP Deploy                                                   │
│    - Sube /dist/ a Hostinger vía FTP                           │
│    - Código ya tiene Google Ads incrustado                      │
└─────────────────────────────────────────────────────────────────┘
```

**Puntos clave:**
- ✅ **NO necesitas configurar nada en Hostinger**
- ✅ Las variables se manejan 100% en GitHub Secrets
- ✅ El build se hace en GitHub Actions (con las variables)
- ✅ Solo se sube el código compilado a Hostinger
- ✅ Tu workflow `.github/workflows/deploy.yml` ya está configurado

#### ¿Cómo funcionan las variables de entorno?

- **Desarrollo local:** Lee del archivo `.env`
- **Build en GitHub Actions:** Lee de GitHub Secrets
- **Build en Vercel/Netlify:** Lee de sus configuraciones
- **Las variables se "incrustán" en el código durante el build** (no se leen en runtime)

### Paso 3: Configurar Conversiones en Google Ads

1. **Ir a Google Ads → Herramientas y Configuración → Conversiones**

2. **Crear las siguientes conversiones:**

   - **Compra completada**
     - Categoría: Compra
     - Valor: Usa valores específicos de transacciones
     - Recuento: Cada conversión

   - **Contacto - Click en teléfono**
     - Categoría: Contacto
     - Valor: Asigna un valor estimado
     - Recuento: Cada conversión

   - **Agregar al carrito**
     - Categoría: Interacción
     - Valor: Valor del producto
     - Recuento: Cada conversión

3. **Copia los IDs y Labels** que Google Ads te proporciona

### Paso 4: Implementar Tracking en el Código

Ya se han creado las funciones de tracking en `src/utils/googleAds.js`. Ahora debes usarlas en tu código:

#### Ejemplo 1: Tracking de Click en WhatsApp (UBICACIÓN EXACTA)

**Archivo:** `src/shared/components/WhatsAppButton/WhatsAppButton.jsx`

**Línea actual:** 10

**Código actual:**
```javascript
onClick={() => handleContactClick('3133978710', true)}
```

**Cambiar por:**
```javascript
import { trackContactView } from '../../../utils/googleAds';

// Dentro del componente WhatsAppButton, línea 10:
onClick={() => {
  trackContactView(); // Track conversión
  handleContactClick('3133978710', true);
}}
```

#### Ejemplo 2: Tracking de Ver Producto (UBICACIÓN EXACTA)

**Archivo:** `src/shared/components/ModernProductCard/ModernProductCard.jsx`

**Agregar al final del componente (después de la línea 22):**

```javascript
import { trackAddToCart } from '../../../utils/googleAds';

// Agregar esta función dentro del componente ModernProductCard:
const handleProductClick = () => {
  // Track cuando el usuario ve/hace click en un producto
  trackAddToCart(product.PRODUCTO, product.PRECIO);
};
```

**Modificar el artículo (línea 24):**
```javascript
// Cambiar de:
<article className="modern-product-card">

// A:
<article
  className="modern-product-card"
  onClick={handleProductClick}
  style={{ cursor: 'pointer' }}
>
```

#### Ejemplo 3: Tracking de Compra por WhatsApp

**Archivo:** `src/shared/components/WhatsAppButton/whatsappUtils.js`

Si quieres trackear cuando el usuario hace una "compra" (envía mensaje de WhatsApp con productos):

```javascript
import { trackPurchase } from '../../utils/googleAds';

// Dentro de la función handleContactClick, agregar:
export const handleContactClick = (phoneNumber, includeProducts) => {
  // ... tu código existente ...

  // Antes de abrir WhatsApp, track la conversión
  if (includeProducts) {
    const cartProducts = // obtener productos del carrito
    const total = // calcular total
    trackPurchase(total, `WA-${Date.now()}`);
  }

  // ... resto del código ...
};
```

### Paso 5: Verificar la Instalación

1. **Instalar la extensión de Chrome:** [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm)

2. **Ejecutar el sitio localmente:**
   ```bash
   npm run dev
   ```

3. **Verificar que el tag de Google Ads aparece en Tag Assistant**

4. **Realizar acciones de prueba** (agregar al carrito, ver teléfono, etc.)

5. **Verificar en Google Ads:**
   - Google Ads → Herramientas → Conversiones
   - Debería mostrar conversiones recientes (puede tomar 24-48 horas)

## 🎯 Cómo Mostrar Anuncios (UBICACIONES EXACTAS)

Ya se creó el componente `GoogleAdBanner` listo para usar. Aquí está cómo implementarlo:

### Componente Creado:
**Archivo:** `src/shared/components/GoogleAdBanner/GoogleAdBanner.jsx`

Este componente ya está listo. Solo necesitas:
1. Obtener el `ad-slot` desde Google AdSense
2. Importar el componente donde quieras mostrar anuncios
3. Usar el componente

### Ubicaciones Sugeridas para Anuncios:

#### 1. Banner en la Página Principal (Home)

**Archivo:** `src/presentation/pages/Home/Home.jsx`

**Dónde agregarlo:** Después de las categorías, antes de la lista de productos

```javascript
import GoogleAdBanner from '../../../shared/components/GoogleAdBanner';

// Dentro del componente Home, agregar:
<GoogleAdBanner
  slot="TU_AD_SLOT_AQUI"
  format="horizontal"
/>
```

#### 2. Entre Productos (ProductList)

**Archivo:** `src/presentation/components/features/products/ProductList/ProductList.jsx`

**Dónde agregarlo:** Cada 6-8 productos en la lista

```javascript
import GoogleAdBanner from '../../../../../shared/components/GoogleAdBanner';

// En el map de productos, agregar condición:
{products.map((product, index) => (
  <>
    <ModernProductCard key={product.id} product={product} />

    {/* Mostrar anuncio cada 6 productos */}
    {(index + 1) % 6 === 0 && (
      <GoogleAdBanner
        slot="TU_AD_SLOT_AQUI"
        format="rectangle"
        className="product-list-ad"
      />
    )}
  </>
))}
```

#### 3. Banner en el Footer

**Archivo:** `src/presentation/components/layout/Footer/Footer.jsx`

**Dónde agregarlo:** Al inicio del footer

```javascript
import GoogleAdBanner from '../../../../shared/components/GoogleAdBanner';

// Dentro del componente Footer, al inicio:
<GoogleAdBanner
  slot="TU_AD_SLOT_AQUI"
  format="horizontal"
/>
```

### Cómo Obtener tu Ad Slot:

1. Ve a Google AdSense → Anuncios → Por unidad de anuncio
2. Crea una nueva unidad de anuncio
3. Elige el formato (display, in-feed, etc.)
4. Copia el código que te dan
5. Busca la línea `data-ad-slot="XXXXXXXXXX"`
6. Usa ese número en el prop `slot` del componente

## 📊 Mejores Prácticas

1. **No abuses de los anuncios:** Demasiados anuncios pueden afectar la experiencia del usuario
2. **Responsive:** Asegúrate de que los anuncios se vean bien en móvil
3. **Cumple con las políticas:** Lee las [políticas de Google AdSense](https://support.google.com/adsense/answer/48182)
4. **Monitor de rendimiento:** Revisa regularmente Google Ads para optimizar
5. **A/B Testing:** Prueba diferentes ubicaciones y formatos

## 🔒 Políticas Importantes

- ❌ NO clicks en tus propios anuncios
- ❌ NO pidas a otros que hagan click
- ❌ NO coloques anuncios en páginas prohibidas (alcohol puede tener restricciones)
- ✅ Declara que es un sitio de alcohol/mayores de edad
- ✅ Cumple con las leyes locales de publicidad de alcohol

## 📞 Soporte

Si tienes problemas:

1. **Centro de Ayuda de Google Ads:** https://support.google.com/google-ads
2. **Centro de Ayuda de AdSense:** https://support.google.com/adsense
3. **Foro de la Comunidad:** https://support.google.com/adsense/community

## ✅ Checklist de Implementación

Marca cada item cuando lo completes:

- [ ] Cuenta de Google Ads creada
- [ ] ID de Publisher obtenido
- [ ] `index.html` actualizado con el ID real
- [ ] `public/ads.txt` actualizado con el ID real
- [ ] Archivo `.env` creado con todas las variables
- [ ] IDs de conversión configurados en Google Ads
- [ ] Variables de entorno actualizadas con IDs de conversión
- [ ] Tracking implementado en componentes relevantes
- [ ] Google Tag Assistant instalado y verificado
- [ ] Pruebas de conversión realizadas
- [ ] Anuncios display implementados (opcional)
- [ ] Sitio desplegado con los cambios
- [ ] Verificación en Google Ads después de 24-48 horas

---

**Nota:** Esta configuración está preparada pero no activa hasta que reemplaces los IDs de placeholder con tus IDs reales de Google Ads.
