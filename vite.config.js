import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    sourcemap: false,

    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,  
        drop_debugger: true,  
      },
      mangle: true,          
      format: {
        comments: false,      
      },
    },

    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
