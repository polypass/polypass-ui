import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ outDir: "dist" }), svgr()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PolypassUI",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@heroui/react",
        "@phosphor-icons/react",
        "clsx",
        "next",
        "next-themes",
        "react-aria",
        "tailwindcss",
      ],
      output: {
        exports: "named",
        preserveModules: false,
        preserveModulesRoot: "src",
      },
    },
    minify: false,
    sourcemap: true,
  },
});
