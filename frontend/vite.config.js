import preactRefresh from "@prefresh/vite";
import { defineConfig } from "vite";

export default defineConfig({
  jsx: "preact",
  plugins: [preactRefresh()],
  alias: {
    react: "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: {
      clientPort: 80,
    },
  },
});
