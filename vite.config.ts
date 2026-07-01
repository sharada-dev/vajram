import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Dev serves at "/"; production builds under "/vajram/" for GitHub Pages project site.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/vajram/' : '/',
}))
