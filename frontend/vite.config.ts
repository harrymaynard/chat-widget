import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslintPlugin()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
