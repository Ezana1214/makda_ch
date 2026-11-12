import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssr: {
    // Paquets CommonJS à intégrer dans le rendu serveur (pré-rendu)
    noExternal: ['react-helmet-async'],
  },
});
