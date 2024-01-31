import "@testing-library/jest-dom";

global.ResizeObserver = require("resize-observer-polyfill");

jest.mock("@cardano-foundation/cardano-connect-with-wallet", () => ({
  useCardano: () => ({
    isEnabled: false,
    isConnected: false,
    isConnecting: false,
    enabledWallet: "exampleWallet",
    stakeAddress: "exampleAddress",
    usedAddresses: [],
    unusedAddresses: [],
    signMessage: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    installedExtensions: [],
    accountBalance: 100
  }),
  NetworkType: {
    MAINNET: "mainnet",
    TESTNET: "testnet"
  }
}));

jest.mock("*.svg?react", () => "SvgMock");

jest.mock("@cardano-foundation/cardano-connect-with-wallet-core", () => ({
  NetworkType: {
    MAINNET: "mainnet",
    TESTNET: "testnet"
  },
  isWalletInstalled: jest.fn()
}));
