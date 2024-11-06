import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import postcss from "rollup-plugin-postcss";

function getCSSFiles() {
  const cssFiles: string[] = [];

  const packages = fs
    .readdirSync(path.resolve(process.cwd(), ".."))
    .filter((pack) => pack !== "styles");

  packages.forEach((pkg) => {
    const cssPath = path.resolve(
      process.cwd(),
      "..",
      "..",
      `packages/${pkg}/dist/style.css`
    );
    if (fs.existsSync(cssPath)) {
      cssFiles.push(cssPath);
    }
  });

  return cssFiles;
}

export default defineConfig({
  plugins: [
    postcss({
      minimize: true,
      extract: "index.css",
      modules: false,
    }),
  ],
  build: {
    assetsDir: "",
    minify: true,
    rollupOptions: {
      input: getCSSFiles(),
      // output: {
      //   compact: true,
      //   minifyInternalExports: true,
      // },
    },
  },
  // css: {
  //   postcss: path.resolve(__dirname, "./postcss.config.cjs"),
  // },
});
