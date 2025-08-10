import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // nécessaire pour rendre le serveur accessible depuis l’extérieur
    port: 5173, 
    allowedHosts: [
      '.ngrok-free.app'  //  lien ngrok actuel
    ]
  }
})
