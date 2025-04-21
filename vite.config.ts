import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/]
    },
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress circular dependency warnings for react
        if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.message.includes('react')) {
          return;
        }
        warn(warning);
      }
    }
  }
});