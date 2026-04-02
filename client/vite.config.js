// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    // Proxy API requests to FastAPI backend
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Proxy WebSocket connections (socket.io)
      '/socket.io': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },

  // Preview server (after build)
  preview: {
    port: 5173,
    host: true,
  },

  // Path aliases for cleaner imports
  resolve: {
    alias: {
      '@':           '/src',
      '@components': '/src/components',
      '@pages':      '/src/pages',
      '@contexts':   '/src/contexts',
      '@services':   '/src/services',
      '@api':        '/src/api',
      '@assets':     '/src/assets',
      '@utils':      '/src/utils',
      '@hooks':      '/src/hooks',
    },
  },

  // CSS configuration
  css: {
    devSourcemap: true,
    postcss: './postcss.config.js',
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    // Chunk splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react':    ['react', 'react-dom'],
          'vendor-router':   ['react-router-dom'],
          'vendor-charts':   ['recharts'],
          'vendor-ui':       ['lucide-react', 'react-icons'],
          'vendor-toast':    ['react-hot-toast', 'react-toastify'],
          'vendor-axios':    ['axios'],
          'vendor-socket':   ['socket.io-client'],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },

  // Environment variables prefix
  envPrefix: 'VITE_',

  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'recharts',
      'lucide-react',
      'react-icons',
      'react-hot-toast',
      'react-toastify',
      'socket.io-client',
    ],
  },

  // Define global constants
  define: {
    __APP_NAME__:    JSON.stringify('VoltIQ'),
    __APP_VERSION__: JSON.stringify('1.0.0'),
  },
})
