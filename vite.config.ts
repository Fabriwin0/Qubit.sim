import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  publicDir: 'public', // Explicitly set public directory
  assetsInclude: ['**/*.svg'], // Ensure SVG files are handled as assets
});