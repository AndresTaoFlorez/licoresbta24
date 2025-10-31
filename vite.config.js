import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  base: './', // usa rutas relativas
  plugins: [
    react(),

    // Bundle analyzer - genera stats.html para análisis
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: './dist/stats.html'
    }),

    // Compresión Gzip (más compatible)
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Solo archivos >1KB
      deleteOriginFile: false
    }),

    // Compresión Brotli (mejor compresión, ~20% más pequeño que gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
  ],

  build: {
    // Optimizaciones de producción
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2, // Dos pasadas de minificación para mejor compresión
      },
      mangle: {
        safari10: true, // Compatibilidad con Safari 10
      },
    },

    // Code splitting inteligente
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks separados
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('/react/') || id.includes('/react-dom/')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            if (id.includes('@reduxjs') || id.includes('react-redux') || id.includes('reselect')) {
              return 'redux-vendor';
            }
            // Otras librerías (excluye lucide-react ya que usamos SVGs inline)
            return 'vendor';
          }
        },
        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 500,

    // CSS code splitting
    cssCodeSplit: true,

    // Source maps para debugging (desactivar en producción final)
    sourcemap: false,

    // Target browsers (ES2020 para mejor compresión)
    target: 'es2020',
  },

  // Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    // Excluir unused dependencies del pre-bundling
    exclude: ['motion', 'swapy', 'lucide-react'],
  },

  server: {
    allowedHosts: true
  },
});
