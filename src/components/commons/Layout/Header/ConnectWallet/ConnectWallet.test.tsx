import { isWalletInstalled, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";

import { fireEvent, render, screen } from "src/test-utils";

import ConnectWallet from ".";
const mockProps = {
  onSuccess: jest.fn().mockImplementation(() => {
    // Todo: mock implementation
  })
};

jest.mock("@cardano-foundation/cardano-connect-with-wallet", () => ({
  isWalletInstalled: jest.fn(),
  useCardano: jest.fn() as jest.Mock extends (...args: any) => infer R ? R : never,
  NetworkType: {
    MAINNET: "mainnet",
    TESTNET: "testnet"
  }
}));

beforeEach(() => {
  const mockUseCardano = useCardano as jest.Mock;
  const mockedReturnValue = {
    isEnabled: true,
    isConnected: true,
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
  };
  (isWalletInstalled as jest.Mock).mockReturnValue(true);
  mockUseCardano.mockReturnValue(mockedReturnValue);
});
describe("ConnectWallet component", () => {
  it("should component render", () => {
    render(<ConnectWallet {...mockProps} />);
    expect(screen.getByRole("button", { name: /examp\.\.\.dress/i })).toBeInTheDocument();
  });

  it("should component open the modal", async () => {
    render(<ConnectWallet {...mockProps} />);
    await fireEvent.click(screen.getByRole("button", { name: /examp\.\.\.dress/i }));
    expect(screen.getByRole("heading", { name: /user profile/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /disconnect/i })).toBeInTheDocument();
  });
});
