import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Cambia esto si necesitas un puerto diferente
  },
  build: {
    sourcemap: true, // Genera mapas de origen para depuración en producción
  },
});
