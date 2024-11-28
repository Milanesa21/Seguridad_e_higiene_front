import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    watch: {
      usePolling: true,  // Habilita el polling
      interval: 100,     // Intervalo de chequeo en milisegundos
    },
  },
})
