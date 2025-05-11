import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // 加载 .env.production / .env.iter1 / .env.iter2 中的变量
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE || '/',
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // 恢复 @ 指向 src
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      // 可选：让 process.env.VITE_… 在代码里可访问
      'process.env': { ...env }
    },
    build: {
      // 例如 mode=iter1 时输出到 dist/iter1
      outDir: env.VITE_BASE
        ? `dist/${env.VITE_BASE.replace(/^\/|\/$/g, '')}`
        : 'dist'
    },
    assetsInclude: ['**/*.docx']
  }
})