import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost', 
    port: 5173,      
    open: true    
  },
  plugins: [react()],
})
