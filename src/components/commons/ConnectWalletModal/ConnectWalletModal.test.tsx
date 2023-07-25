import { isWalletInstalled, useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";

jest.mock("@cardano-foundation/cardano-connect-with-wallet", () => ({
  isWalletInstalled: jest.fn(),
  useCardano: jest.fn() as jest.Mock extends (...args: any) => infer R ? R : never,
  NetworkType: {
    MAINNET: "mainnet",
    TESTNET: "testnet"
  }
}));
import ConnectWalletModal from ".";

describe("BookmarkButton component", () => {
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
    mockUseCardano.mockReturnValueOnce(mockedReturnValue);
  });
  it("should all the wallets render", () => {
    render(<ConnectWalletModal connect={jest.fn()} isModal={true} onTriggerSignMessage={jest.fn()} />);
    const eternlWallet = screen.getByRole("heading", {
      name: /eternl/i
    });
    const yoroiWallet = screen.getByRole("heading", {
      name: /yoroi/i
    });
    const tythonWallet = screen.getByRole("heading", {
      name: /typhon/i
    });

    expect(eternlWallet).toBeInTheDocument();
    expect(yoroiWallet).toBeInTheDocument();
    expect(tythonWallet).toBeInTheDocument();
  });

  it("should compoennt connect the wallet", async () => {
    const onConnect = jest.fn();
    render(<ConnectWalletModal connect={onConnect} isModal={true} onTriggerSignMessage={jest.fn()} />);
    const ceternWalletButton = screen.getByRole("img", { name: /flint/i });
    await userEvent.click(ceternWalletButton);
    expect(onConnect).toBeCalled();
  });
});
