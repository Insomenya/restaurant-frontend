import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/restaurant-frontend/',
  resolve: {
    alias: {
      src: "/src",
    },
  }
});