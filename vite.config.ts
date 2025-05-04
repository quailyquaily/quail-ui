import scss from 'rollup-plugin-scss';
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const ret:any = {
    plugins: [
      vue(),
      scss({
        fileName: 'quail-ui.css',
        include: [
          "styles/base.scss",
          "styles/component.scss",
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    assetsInclude: ['**/*.png', '**/*.svg', '**/*.webp'],
  }
  if (mode === 'lib') {
    ret.build = {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'QuailUI',
        // the proper extensions will be added
        fileName: 'index',
      },
      sourcemap: true,
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    }
  } else if (mode === 'demo') {
    ret.base = '/quail-ui/'
  }
  if (ret.build === undefined) {
    ret.build = {}
  }
  ret.build.cssMinify = true
  ret.build.minify = 'esbuild'

  return ret;
})