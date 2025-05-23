import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// Export Vite configuration
export default defineConfig(({ mode }) => {
  // Load environment variables based on current mode (e.g., .env.iter3)
  const env = loadEnv(mode, process.cwd())

  return {
    // Set base URL for routing (e.g., /iter3/)
    base: env.VITE_BASE || '/',

    // Register Vite plugins
    plugins: [
      vue(),              // Vue 3 support
      vueDevTools(),      // Devtools integration
      tailwindcss(),      // Tailwind CSS integration
    ],

    // Define import alias
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)), // Use @ for src/
      },
    },

    // Make env variables available in the app
    define: {
      'process.env': { ...env }
    },

    // Custom output directory based on VITE_BASE (e.g., dist/iter3)
    build: {
      outDir: env.VITE_BASE
        ? `dist/${env.VITE_BASE.replace(/^\/|\/$/g, '')}`
        : 'dist'
    },

    // Allow bundling of external .docx files (used in Q&A export)
    assetsInclude: ['**/*.docx']
  }
})
