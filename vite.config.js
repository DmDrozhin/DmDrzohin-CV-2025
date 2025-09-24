import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/DmDrzohin-CV-2025/' : '/',
  plugins: [vue(), vuetify({ autoImport: true })],
  build: {
    // полностью отключаем data URI (все ассеты будут копироваться в dist/assets)
    assetsInlineLimit: 0
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/index.scss" as *;
        `
      }
    }
  }
}));
