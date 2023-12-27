import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "REACT_");
  return {
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL),
      "process.env.REACT_APP_AUTH_API_URL": JSON.stringify(env.REACT_APP_AUTH_API_URL),
      "process.env.REACT_APP_NETWORK_NAMES": JSON.stringify(env.REACT_APP_NETWORK_NAMES),
      "process.env.REACT_APP_JSD_WIDGET_KEY": JSON.stringify(env.REACT_APP_JSD_WIDGET_KEY),
      "process.env.REACT_APP_NETWORK": JSON.stringify(env.REACT_APP_NETWORK),
      "process.env.REACT_APP_MAINNET_APP_URL": JSON.stringify(env.REACT_APP_MAINNET_APP_URL),
      "process.env.REACT_APP_SANCHONET_APP_URL": JSON.stringify(env.REACT_APP_SANCHONET_APP_URL)
    },
    base: "",
    resolve: { alias: { src: path.resolve(__dirname, "./src") } },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"]
        }
      }),
      viteTsconfigPaths(),
      svgr({
        svgrOptions: {
          ref: true
        }
      })
    ],
    server: {
      open: true,
      port: 1102
    },
    build: {
      minify: false,
      assetsInlineLimit: 0
    }
  };
});
