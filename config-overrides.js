/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = function override(config) {
  config.resolve.plugins = config.resolve.plugins.filter((plugin) => !(plugin instanceof ModuleScopePlugin));
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify")
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"]
    })
  );

  return config;
};
