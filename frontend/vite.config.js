// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const plugins = [react(), compression({ algorithm: 'brotliCompress' })];

  if (mode === 'development') {
    const { visualizer } = require('rollup-plugin-visualizer');
    plugins.push(visualizer({ open: true, gzipSize: true }));
  }

  return {
    plugins,
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            auth: ['@auth0/auth0-react'],
            icons: ['lucide-react'],
            charts: ['recharts'],
            vendor: ['axios', 'date-fns']
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://route17-production.up.railway.app',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
          secure: false
        }
      }
    },
    css: {
      modules: {
        localsConvention: 'camelCase'
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`
        }
      }
    }
  };
});
