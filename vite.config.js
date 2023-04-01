import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      // optional proxy setup
    },
  },
  optimizeDeps: {
    // optional dependency optimization
  },
  // serve configuration
  serve: {
    port: 5000,
    open: true,
    cors: true,
  },
});
