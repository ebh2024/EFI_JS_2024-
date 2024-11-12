import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Asegúrate de que este sea el puerto en el que tu API Flask está corriendo
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
