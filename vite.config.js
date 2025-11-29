import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/menu': 'http://localhost:8081',
      '/api/cart': 'http://localhost:8083',
      '/api/bookings': 'http://localhost:8084',
      '/api/auth': 'http://localhost:8082'
    }
  }
});
