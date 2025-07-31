import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ outDir: "dist" })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PolypassUI",
      fileName: (format) => `index.${format}.js`,
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
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        exports: "named",
        preserveModules: false,
        preserveModulesRoot: "src",
      },
    },
    minify: false,
    sourcemap: true,
  },
});
