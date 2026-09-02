import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// The two local APIs live on different ports, so calling them straight from
// the browser would be cross-origin. Proxying them under the dev server's own
// origin keeps requests same-origin and means neither backend needs CORS
// headers. Requests are issued with relative paths (see src/api/config.ts).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/wanaka/accounts': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/wanaka/player': {
        target: 'http://localhost:3010',
        changeOrigin: true,
      },
      '/api/dashboard': {    
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/games/list': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api/games': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
