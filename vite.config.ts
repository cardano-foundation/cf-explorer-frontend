/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import rollupNodePolyFill from "rollup-plugin-polyfill-node";

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
      "process.env.REACT_APP_SANCHONET_APP_URL": JSON.stringify(env.REACT_APP_SANCHONET_APP_URL),
      "process.env.REACT_APP_BOLNISI_NAME_API": JSON.stringify(env.REACT_APP_BOLNISI_NAME_API),
      "process.env.REACT_APP_ADA_HANDLE_API": JSON.stringify(env.REACT_APP_ADA_HANDLE_API),
      "process.env.REACT_APP_API_URL_COIN_GECKO": JSON.stringify(env.REACT_APP_API_URL_COIN_GECKO)
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis"
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true
          })
        ]
      }
    },
    // base: "/en/",
    resolve: {
      alias: { "src/": resolve(__dirname, "./src/$1"), crypto: "crypto-browserify", stream: "stream-browserify" }
    },
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
        },
        include: "**/*.svg?react"
      })
    ],
    server: {
      open: true,
      port: 1102
    },
    build: {
      minify: false,
      assetsInlineLimit: 0,
      rollupOptions: {
        plugins: [rollupNodePolyFill()] as any
      }
    }
  };
});
