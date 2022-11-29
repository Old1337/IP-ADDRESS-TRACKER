import { defineConfig } from "vite";

export default defineConfig({
  base: "/IP-ADDRESS-TRACKER/",
  build: {
    minify: "esbuild",
    target: "esnext",
  },
});
