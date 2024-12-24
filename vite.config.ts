import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // כאן תוכל להגדיר את הבסיס שלך, אם יש צורך
})
