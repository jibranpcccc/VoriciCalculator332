import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        // Remove console.log in production
        drop_console: true,
        drop_debugger: true,
        // Remove unused code
        dead_code: true,
        // Optimize conditionals
        conditionals: true,
        // Optimize comparisons
        comparisons: true,
        // Optimize sequences
        sequences: true,
        // Optimize properties
        properties: true,
        // Optimize unused variables
        unused: true,
        // Optimize joins
        join_vars: true,
        // Optimize loops
        loops: true,
        // Optimize if statements
        if_return: true,
        // Optimize inline functions
        inline: true,
        // Optimize reduce variables
        reduce_vars: true
      },
      mangle: {
        // Mangle variable names for smaller bundle
        toplevel: true,
        safari10: true
      },
      format: {
        // Remove comments
        comments: false
      }
    },
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for third-party libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // UI components chunk
          ui: ['lucide-react']
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(css)$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    },
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (disable in production for smaller builds)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Optimize CSS
    cssCodeSplit: true,
    // Enable CSS minification
    cssMinify: true
  },
  // Optimize development server
  server: {
    // Enable compression
    compress: true,
    // Optimize HMR
    hmr: {
      overlay: false
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    // Include dependencies that should be pre-bundled
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react'
    ],
    // Exclude dependencies that should not be pre-bundled
    exclude: []
  }
})

