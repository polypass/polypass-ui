import { defineConfig } from "tsup";
import svgr from "esbuild-plugin-svgr";
import jsx from "@svgr/plugin-jsx";

export default defineConfig({
  entry: ["src/index.ts", "src/lib/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [svgr({ svgo: false, plugins: [jsx] })],
});
