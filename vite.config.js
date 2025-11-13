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
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: {
        safari10: true,
      },
    },

    // Desactivar code splitting manual - dejar que Vite lo maneje automáticamente
    rollupOptions: {
      output: {
        manualChunks: undefined, // Vite optimiza automáticamente
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },

    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
    ],
  },

  server: {
    allowedHosts: true
  },
});
