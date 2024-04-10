import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { config as dotenvConfig } from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenvConfig();

export default defineConfig({
  plugins: [react()],
  define: {
    // Definir las variables de entorno
    "process.env.VITE_DOMAIN": JSON.stringify(process.env.VITE_DOMAIN),
    "process.env.VITE_CLIENT_ID": JSON.stringify(process.env.VITE_CLIENT_ID),
  },
});
