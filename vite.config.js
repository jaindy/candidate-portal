import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  base:"/candidate-portal",
  server:{
    proxy: {
      '/api': {
        target: 'https://localhost:7050',
        changeOrigin: true,
        secure: false, // Allows self-signed certs
        headers:{
          'xApiKey': 'c0e67c79-e208-42da-a8d5-5fc5e279c419',
        }
      },
    },
  }
})


