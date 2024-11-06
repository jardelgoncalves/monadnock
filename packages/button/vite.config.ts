import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.tsx",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    sourcemap: true,
    target: "es2020",
  },
  css: {
    modules: {
      generateScopedName: "[local]_[hash:base64:5]", // Geração do nome das classes CSS
    },
    postcss: path.resolve(__dirname, "./postcss.config.js"),
  },
  plugins: [react()],
  publicDir: false,
});
