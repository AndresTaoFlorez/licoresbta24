import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { copyFileSync, writeFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno
  const env = loadEnv(mode, process.cwd(), '');

  return {
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

    // Plugin personalizado para copiar .htaccess y generar ads.txt
    {
      name: 'copy-files',
      closeBundle() {
        try {
          // Copiar .htaccess
          copyFileSync('public/.htaccess', 'dist/.htaccess')
          console.log('✓ .htaccess copiado a dist/')

          // Generar ads.txt si hay Publisher ID configurado
          const publisherId = env.VITE_GOOGLE_ADS_PUBLISHER_ID;
          if (publisherId && publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
            const adsTxtContent = `# Google AdSense\ngoogle.com, ${publisherId.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`;
            writeFileSync('dist/ads.txt', adsTxtContent);
            console.log('✓ ads.txt generado en dist/');
          } else {
            console.log('⚠ ads.txt NO generado - Configura VITE_GOOGLE_ADS_PUBLISHER_ID en .env');
          }
        } catch (err) {
          console.error('Error en copy-files plugin:', err)
        }
      }
    },
  ],

  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2, // Mejorar compresión con 2 pasadas
      },
      mangle: {
        safari10: true,
      },
    },

    // Code splitting optimizado para mejor carga
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar dependencias grandes en chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
          'vendor-motion': ['motion'],
          'vendor-icons': ['lucide-react', 'react-icons'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },

    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
    reportCompressedSize: false, // Acelera el build
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
  };
});
