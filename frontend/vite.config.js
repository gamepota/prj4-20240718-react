import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import * as dotenv from "dotenv";

const targetServer = process.env.TARGET_SERVER || 'localhost';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ws": {
        target: `http://${targetServer}:8080`,
        changeOrigin: true,
        ws: true
      },
      "/api": {
        target: `http://${targetServer}:8080`,
        changeOrigin: true
      }
    },
  },
  resolve: {
    alias: {
      'global': 'global/auto'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
})
