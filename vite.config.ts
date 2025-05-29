import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/memoria-conexion/', // 👈 muy importante
  plugins: [react()],
});
