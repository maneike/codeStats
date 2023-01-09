import preactRefresh from "@prefresh/vite";
import defineConfig from "vite";

export default defineConfig({
  jsx: "preact",
  plugins: [preactRefresh()],
  alias: {
    react: "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
  },
  server: {
    host: "0.0.0.0",
    hmr: {},
  },
});
