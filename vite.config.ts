import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({

  base: './',

  plugins: [react(), tailwindcss()],

  resolve: {

    alias: {

      '@': path.resolve(__dirname, '.'),

    },

  },

});