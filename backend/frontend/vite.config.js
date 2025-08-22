import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:'/',
  server: {
    proxy: {
      // Any request starting with /api will be forwarded to your backend
      '/api': 'http://localhost:5000' 
    }
  }
});

