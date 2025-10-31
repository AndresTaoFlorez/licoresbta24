## Prompt Mejorado para Claude Code

```
# ANÁLISIS Y OPTIMIZACIÓN DE PERFORMANCE - Lighthouse 35 → 90+

## CONTEXTO DEL PROYECTO
- **Sitio:** licoresbta24.com (eCommerce de licores en Bogotá)
- **Stack:** React + Vite + SCSS + Redux
- **Estado actual:** Visualmente pulido y funcional
- **Lighthouse scores:**
  - Performance: 35 ❌
  - Accessibility: 84 ⚠️
  - Best Practices: 100 ✅
  - SEO: 92 ✅

## CARACTERÍSTICAS TÉCNICAS CONOCIDAS
- Animaciones CSS complejas (backdrop-filter, blur, gradients)
- Redux para manejo de estado
- React Router para navegación
- Componentes con efectos glassmorphism
- Imágenes de productos (posiblemente sin optimizar)
- Efectos de parallax/background animados
- Fuentes custom (probablemente Google Fonts)

## OBJETIVO
Elevar Performance a **mínimo 90** sin sacrificar la estética visual premium del sitio.

---

## TAREAS ESPECÍFICAS

### 1️⃣ ANÁLISIS PROFUNDO DEL BUILD
**Acción:** Analiza el bundle de producción actual.

```bash
# Ejecuta estos comandos y analiza resultados:
npm run build
ls -lh dist/assets/
```

**Detecta:**
- ✅ Tamaño total del JS bundle (objetivo: <200KB gzipped)
- ✅ Dependencias pesadas (React Icons, animaciones, Redux)
- ✅ Código no usado (tree-shaking efectivo)
- ✅ Chunks duplicados

**Propón:**
- Code-splitting por rutas con React.lazy()
- Lazy loading de componentes pesados (ModernProductCard, Slider)
- Análisis con `rollup-plugin-visualizer`

---

### 2️⃣ OPTIMIZACIÓN DE IMÁGENES Y ASSETS

**Detecta:**
- Imágenes de productos sin compresión
- Formatos obsoletos (PNG/JPG en lugar de WebP/AVIF)
- Imágenes cargadas antes del viewport
- SVGs sin optimizar
- Logos o iconos que podrían ser inline SVG

**Propón:**
```jsx
// Ejemplo de optimización esperada:
<img 
  src="/products/whisky.webp"
  srcSet="/products/whisky-mobile.webp 480w, /products/whisky-desktop.webp 1200w"
  sizes="(max-width: 768px) 480px, 1200px"
  loading="lazy"
  decoding="async"
  alt="..."
/>
```

**Herramientas a configurar:**
- `vite-plugin-imagemin` para compresión automática
- Conversión a WebP/AVIF en build time
- Lazy loading nativo en todas las imágenes no-hero

---

### 3️⃣ REDUCCIÓN DE COSTO DE RENDERIZADO

**Identifica componentes con:**
- `backdrop-filter: blur()` (muy costoso en móvil)
- Animaciones con `transform` no optimizadas
- Sombras complejas (`box-shadow` con múltiples capas)
- Gradientes animados
- Re-renders innecesarios

**Propón alternativas:**
```scss
// MAL (costoso)
.card {
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

// BIEN (optimizado)
.card {
  background: rgba(0,0,0,0.8); // blur estático en imagen de fondo
  box-shadow: 0 4px 12px rgba(0,0,0,0.3); // sombra más simple
  will-change: transform; // hint al navegador
}
```

**Optimiza animaciones:**
- Usa `transform` y `opacity` únicamente
- Evita `width`, `height`, `top`, `left` en animaciones
- Añade `will-change` selectivamente
- React.memo() en componentes que no necesitan re-render

---

### 4️⃣ OPTIMIZACIÓN DE FUENTES

**Detecta:**
- Fuentes externas sin preload
- Múltiples pesos de fuente cargados innecesariamente
- `font-display` no configurado

**Propón:**
```html
<!-- index.html optimizado -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link 
  rel="preload" 
  as="style"
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
>
<link 
  rel="stylesheet" 
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
  media="print" 
  onload="this.media='all'"
>
```

**Configuración SCSS:**
```scss
// Añadir font-display en @font-face custom
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; // crítico para performance
}
```

---

### 5️⃣ CONFIGURACIÓN DE VITE OPTIMIZADA

**Propón `vite.config.js` mejorado:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    
    // Compresión Brotli
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    
    // Análisis de bundle
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    
    // Optimización de imágenes
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
  ],
  
  build: {
    // Optimizaciones de producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    // Code splitting inteligente
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
    
    // CSS code splitting
    cssCodeSplit: true,
  },
  
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
```

---

### 6️⃣ CODE SPLITTING Y LAZY LOADING

**Identifica rutas y componentes a hacer lazy:**
```javascript
// App.jsx - Lazy loading de páginas
import { lazy, Suspense } from 'react';

const SwipeToEnter = lazy(() => import('./presentation/pages/SwipeToEnter/SwipeToEnter'));
const Home = lazy(() => import('./presentation/pages/Home/Home'));
const CategoryPage = lazy(() => import('./presentation/pages/Category/CategoryPage'));

// Componentes pesados también
const ModernProductCard = lazy(() => import('./presentation/components/shared/ModernProductCard'));
```

---

### 7️⃣ OPTIMIZACIÓN DE REDUX

**Detecta:**
- Selectors sin memoización
- Estado innecesario en Redux
- Re-renders por cambios irrelevantes

**Propón:**
```javascript
// Usar createSelector de reselect
import { createSelector } from '@reduxjs/toolkit';

const selectProducts = (state) => state.products.items;
const selectCategory = (state) => state.filters.category;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectCategory],
  (products, category) => 
    products.filter(p => p.category === category)
);
```

---

## DIAGNÓSTICO FINAL ESPERADO

### 🔍 ANÁLISIS RESUMIDO
```
Bundle actual:
  - JS total: XXX KB (gzipped)
  - CSS total: XXX KB
  - Imágenes: XXX MB sin comprimir
  - Dependencias pesadas detectadas: [lista]

Principales problemas:
  1. [Problema específico con métrica]
  2. [Problema específico con métrica]
  3. [Problema específico con métrica]
```

### 🧠 CUELLOS DE BOTELLA DETECTADOS
```
Alto impacto:
  - ❌ Imágenes sin lazy loading (FCP +2.5s)
  - ❌ Bundle de 500KB sin code-splitting (TTI +3s)
  - ❌ backdrop-filter en 15 componentes (FPS <30)

Medio impacto:
  - ⚠️ Fuentes bloqueando renderizado (+0.8s)
  - ⚠️ Redux causando re-renders innecesarios

Bajo impacto:
  - 💡 SVGs sin optimizar (+50KB)
```

### ⚙️ PLAN DE ACCIÓN PRIORIZADO

**🔴 PRIORIDAD ALTA (Hacer primero - Mayor impacto)**
1. Code-splitting de rutas
2. Lazy loading de imágenes
3. Optimización de backdrop-filter
4. Configuración de Vite mejorada

**🟡 PRIORIDAD MEDIA**
1. Optimización de fuentes
2. Memoización de Redux selectors
3. Compresión de assets

**🟢 PRIORIDAD BAJA**
1. Optimización de SVGs
2. Preload de recursos críticos

### 🚀 CONFIGURACIÓN DE BUILD FINAL
[Vite config completo optimizado]

---

## FORMATO DE RESPUESTA ESPERADO

Para cada optimización, proporciona:
- ✅ **Qué hacer** (acción específica)
- 📊 **Impacto esperado** (ej: "FCP -1.2s, LCP -2.1s")
- 🔧 **Código exacto** (sin pseudocódigo)
- ⏱️ **Tiempo de implementación** (5 min / 30 min / 2 horas)
- 🎯 **Prioridad** (Alta/Media/Baja)

## RESTRICCIONES
- ❌ NO sacrificar la estética visual premium
- ❌ NO eliminar animaciones clave del UX
- ✅ Mantener compatibilidad con navegadores modernos (últimos 2 años)
- ✅ Enfoque mobile-first (80% del tráfico es móvil)

## ENTREGABLES
1. Lista priorizada de optimizaciones con código
2. `vite.config.js` optimizado completo
3. Snippets de código para componentes críticos
4. Checklist de verificación post-implementación
5. Estimación de mejora de score (35 → XX)

Sé específico, técnico y directo. Evita teoría genérica.
```

---

**Este prompt está diseñado para que Claude Code analice tu proyecto completo y dé soluciones concretas e implementables.** 🚀