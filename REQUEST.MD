# ANÁLISIS CRÍTICO DE PERFORMANCE - Lighthouse Score 32

## CONTEXTO URGENTE
Mi sitio web licoresbta24.com tiene un puntaje de Performance de **32/100** en Lighthouse.

**Métricas actuales detectadas:**
- ❌ CLS (Cumulative Layout Shift): Crítico - elementos saltando durante carga
- ❌ SI (Speed Index): Muy lento - contenido visible tarda mucho
- ❌ FCP (First Contentful Paint): Lento - primera pintura demorada
- ❌ LCP (Largest Contentful Paint): Crítico - contenido principal tarda >4s
- ⚠️ TBT (Total Blocking Time): Alto - JavaScript bloqueando interacción

**Stack:** React + Vite + SCSS + Redux
**Target:** Subir a mínimo 80-90 en las próximas 2 horas

---

## ANÁLISIS REQUERIDO

### 1. EJECUTA LIGHTHOUSE LOCALMENTE
```bash
# Genera reporte detallado
npm run build
npx lighthouse http://localhost:4173 --view --preset=desktop
```

**Analiza el reporte y encuentra:**
- 🔴 Principales culpables de LCP (imágenes grandes, fuentes, JS bloqueante)
- 🔴 Qué causa el CLS (elementos sin dimensiones, fuentes cargando)
- 🔴 Scripts bloqueando FCP/SI
- 🔴 Recursos sin comprimir o caché

---

## PROBLEMAS COMUNES A VERIFICAR (EN ORDEN DE IMPACTO)

### 🚨 PRIORIDAD CRÍTICA 1: LCP (Largest Contentful Paint)

**Busca estos problemas:**
```jsx
// ❌ PROBLEMA: Imágenes hero sin optimizar
<img src="/hero-background.jpg" /> // 2MB+, bloquea LCP

// ✅ SOLUCIÓN ESPERADA:
<img 
  src="/hero-background.webp"
  srcSet="/hero-sm.webp 640w, /hero-md.webp 1024w, /hero-lg.webp 1920w"
  sizes="100vw"
  fetchpriority="high"
  decoding="async"
  alt="Hero"
/>
```

**Acciones:**
- Detecta la imagen más grande above-the-fold
- Convierte a WebP/AVIF
- Añade `fetchpriority="high"` al elemento LCP
- Preload del recurso crítico:
```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
```

---

### 🚨 PRIORIDAD CRÍTICA 2: CLS (Layout Shift)

**Busca estos problemas:**
```jsx
// ❌ PROBLEMA: Imágenes sin dimensiones
<img src="/product.jpg" />

// ✅ SOLUCIÓN:
<img src="/product.jpg" width="300" height="400" loading="lazy" />
```

**Acciones:**
- Añade `width` y `height` a TODAS las imágenes
- Reserva espacio para fuentes con `font-display: swap`
- Detecta componentes que causan reflow (Slider, ModernCategories, etc.)
```scss
// Reservar espacio para fuentes
@font-face {
  font-family: 'Poppins';
  font-display: swap; // crítico para evitar CLS
  src: url('/fonts/poppins.woff2') format('woff2');
}
```

---

### 🚨 PRIORIDAD CRÍTICA 3: FCP/SI (Render Bloqueante)

**Busca estos problemas:**
```javascript
// ❌ PROBLEMA: Bundle monolítico
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SwipeToEnter from './pages/SwipeToEnter';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
// 500KB+ de JS antes de renderizar

// ✅ SOLUCIÓN: Code splitting
const SwipeToEnter = lazy(() => import('./pages/SwipeToEnter'));
const Home = lazy(() => import('./pages/Home'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
```

**Acciones:**
- Implementa `React.lazy()` en TODAS las rutas
- Lazy load de componentes pesados (ProductCard, Slider, ModernCategories)
- Defer de scripts no críticos

---

### 🚨 PRIORIDAD CRÍTICA 4: TBT (JavaScript Bloqueante)

**Busca estos problemas:**
- Redux store con datos masivos en initial state
- Animaciones con JavaScript en lugar de CSS
- Event listeners pesados en scroll
- Componentes sin React.memo()

**Acciones:**
```javascript
// ✅ Memoizar componentes pesados
export default React.memo(ModernProductCard);

// ✅ Virtualizar listas largas
import { FixedSizeList } from 'react-window';

// ✅ Throttle/debounce en scroll
import { debounce } from 'lodash-es'; // solo importar lo necesario
```

---

## CONFIGURACIÓN VITE OPTIMIZADA PARA SCORE 80+

**Modifica `vite.config.js` con esta config:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { compression } from 'vite-plugin-compression2';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'brotliCompress' }),
    imagetools(),
  ],
  
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
    
    cssCodeSplit: true,
    reportCompressedSize: false,
  },
  
  server: {
    hmr: { overlay: false },
  },
});
```

---

## CHECKLIST DE VERIFICACIÓN INMEDIATA

Revisa estos archivos en orden:

### 1. `index.html`
```html
<!-- ✅ Debe tener preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- ✅ Preload de recurso crítico -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">

<!-- ✅ Fuentes optimizadas -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap">
```

### 2. `App.jsx`
```javascript
// ❌ Busca imports directos
import SwipeToEnter from './pages/SwipeToEnter';

// ✅ Debe ser lazy
const SwipeToEnter = lazy(() => import('./pages/SwipeToEnter'));
```

### 3. Componentes de imagen
```jsx
// ❌ Busca imágenes sin atributos
<img src="/product.jpg" />

// ✅ Debe tener
<img 
  src="/product.webp" 
  width="300" 
  height="400" 
  loading="lazy"
  decoding="async"
/>
```

### 4. `main.scss`
```scss
// ❌ Busca imports masivos
@import 'components/_modern-card.scss';
@import 'components/_product-list.scss';
// ... 20 imports más

// ✅ Critical CSS inline, resto lazy
```

### 5. Redux Store
```javascript
// ❌ Busca initial state pesado
const initialState = {
  products: [...1000 productos], // NO!
};

// ✅ Estado vacío, cargar async
const initialState = {
  products: [],
  loading: false,
};
```

---

## PLAN DE ACCIÓN EN 2 HORAS

**⏱️ HORA 1: Quick Wins (0-60 min)**
1. [10 min] Code splitting de rutas con React.lazy()
2. [15 min] Añadir width/height a todas las imágenes
3. [10 min] Convertir imágenes críticas a WebP
4. [15 min] Preload de recursos críticos (hero image, fuente)
5. [10 min] font-display: swap en todas las fuentes

**⏱️ HORA 2: Optimizaciones Profundas (60-120 min)**
1. [20 min] Optimizar vite.config.js
2. [20 min] Lazy load de componentes pesados
3. [15 min] React.memo() en componentes que re-renderizan
4. [15 min] Comprimir assets con imagetools
5. [10 min] Verificar bundle con rollup-plugin-visualizer

---

## FORMATO DE RESPUESTA ESPERADO

Para cada problema encontrado:
```
❌ PROBLEMA DETECTADO: [Descripción técnica]
📍 Ubicación: src/presentation/pages/Home/Home.jsx:45
📊 Impacto: LCP +2.3s, CLS +0.15
🔧 SOLUCIÓN: [Código específico a cambiar]
⏱️ Tiempo: 10 minutos
🎯 Ganancia esperada: +15 puntos en score
```

---

## ENTREGABLES FINALES

1. ✅ Lista de archivos modificados con cambios específicos
2. ✅ Nuevo `vite.config.js` optimizado
3. ✅ Snippet de optimización para cada métrica crítica
4. ✅ Comando para verificar mejoras:
```bash
npm run build && npm run preview
# Luego ejecutar Lighthouse
```
5. ✅ Score estimado después de optimizaciones

---

## MÉTRICAS OBJETIVO
```
Antes → Después
Performance: 32 → 80+
CLS: X → <0.1
LCP: X → <2.5s
FCP: X → <1.8s
SI: X → <3.4s
TBT: X → <200ms
```

**SÉ ESPECÍFICO, TÉCNICO Y DIRECTO.**
Quiero código exacto a cambiar, no teoría.
Prioriza las optimizaciones con mayor impacto primero.