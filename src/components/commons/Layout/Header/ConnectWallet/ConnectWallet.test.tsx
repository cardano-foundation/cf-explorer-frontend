import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { isWalletInstalled } from "@cardano-foundation/cardano-connect-with-wallet-core";

import { fireEvent, render, screen, waitFor } from "src/test-utils";
import { validateTokenExpired } from "src/commons/utils/helper";

import ConnectWallet from ".";
const mockProps = {
  onSuccess: jest.fn().mockImplementation(() => {
    // Todo: mock implementation
  })
};

jest.mock("@cardano-foundation/cardano-connect-with-wallet", () => ({
  isWalletInstalled: jest.fn(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useCardano: jest.fn() as jest.Mock extends (...args: any) => infer R ? R : never,
  NetworkType: {
    MAINNET: "mainnet",
    TESTNET: "testnet"
  }
}));

jest.mock("src/commons/utils/helper", () => ({
  ...jest.requireActual("src/commons/utils/helper"),
  validateTokenExpired: jest.fn()
}));

beforeEach(() => {
  const mockUseCardano = useCardano as jest.Mock;
  const mockValidateTokenExpired = validateTokenExpired as jest.Mock;
  mockValidateTokenExpired.mockReturnValue(true);
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
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /examp\.\.\.dress/i }));
      expect(screen.getByRole("heading", { name: /account/i })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /sign out/i })).toBeInTheDocument();
    });
  });
});
