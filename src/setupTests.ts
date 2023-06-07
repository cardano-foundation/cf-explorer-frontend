// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";


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
