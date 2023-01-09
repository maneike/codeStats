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
    port: 80,
    host: "http://codestats.projektstudencki.pl/",
    hmr: {
      host: "http://codestats.projektstudencki.pl/",
      clientPort: 80,
    },
  },
});
