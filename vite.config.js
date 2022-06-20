// @ts-check
import preactRefresh from "@prefresh/vite";

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: "preact",
  plugins: [preactRefresh()],
  alias: {
    react: "preact/compat",
    "react-dom": "preact/compat",
  },
};

export default config;
