import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  assetsInclude: ['**/*.tsv'],
  base: command === 'build' ? '/min_price_list/' : '/'
}))