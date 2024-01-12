import "@testing-library/jest-dom";

global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("@cardano-foundation/cardano-connect-with-wallet", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useCardano: jest.fn() as jest.Mock extends (...args: any) => infer R ? R : never,
  NetworkType: {
    MAINNET: "mainnet",
    TESTNET: "testnet"
  },
  isWalletInstalled: jest.fn()
}));

jest.mock("@cardano-foundation/cardano-connect-with-wallet-core", () => ({
  NetworkType: {
    MAINNET: "mainnet",
    TESTNET: "testnet"
  },
  isWalletInstalled: jest.fn()
}));
