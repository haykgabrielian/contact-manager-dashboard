import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({ include: '**/*.js' }),
    tsconfigPaths(),
    tailwindcss()
  ],
  server: {
    hmr: false,
    watch: {
      usePolling: true,
    },
  },
});
