import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'
import tsconfigPaths from 'vite-tsconfig-paths'
import { terser } from 'rollup-plugin-terser'
import removeConsole from 'vite-plugin-remove-console'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), macrosPlugin()],
  // define: { 'process.env': process.env },
  build: {
    outDir: 'build',
    minify: 'terser',
    rollupOptions: {
      plugins: [
        removeConsole(),
        terser({
          format: {
            comments: false
          }
        })
      ]
    }
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 8080,
    strictPort: true
  }
})
