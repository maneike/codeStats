import { createRequire } from "module";
/// <reference types="vitest" />
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import preactRefresh from "@prefresh/vite";
import alias from "@rollup/plugin-alias";

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    preactRefresh(),
    alias({
      entries: [
        { find: "react", replacement: "preact/compat" },
        { find: "react-dom/test-utils", replacement: "preact/test-utils" },
        { find: "react-dom", replacement: "preact/compat" },
      ],
    }),
    preact({
      babel: {
        plugins: ["@emotion"],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
  },
  resolve: {
    alias: [
      {
        find: "preact/hooks",
        replacement: require.resolve("preact/hooks"),
      },
      {
        find: "@testing-library/preact",
        replacement: require.resolve("@testing-library/preact"),
      },
    ],
  },
});
