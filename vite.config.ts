// vite.config.js
import { resolve } from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ include: "lib", insertTypesEntry: true, })],
  build: {
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'React Reactive Storage',
      // the proper extensions will be added
      fileName: 'react-reactive-storage',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
