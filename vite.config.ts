import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // With `vercel dev` on :3000, `npm run dev` can reach /api/* here.
      '/api': { target: 'http://127.0.0.1:3000', changeOrigin: true },
    },
  },
})
