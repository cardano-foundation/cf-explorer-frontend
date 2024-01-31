import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import ContractDetail from ".";

// Mock data for the ITokenMetadata interface
const tokenMetadata: ITokenMetadata = {
  policy: "token_policy_hash",
  logo: "http://example.com/token_logo.png",
  decimals: 18,
  description: "A sample token description",
  ticker: "TKN",
  url: "http://example.com/token_info"
};

// Mock data for the WalletAddress interface
const walletAddress: WalletAddress = {
  address: "0x0123456789abcdef",
  txCount: 100,
  balance: 1234.56,
  tokens: [
    {
      address: "0x9876543210fedcba",
      name: "Sample Token",
      displayName: "Sample Token (TKN)",
      fingerprint: "token_fingerprint",
      quantity: 1000,
      metadata: tokenMetadata
    }
    // Add more tokens here if needed
  ],
  stakeAddress: "0x13579bdfeca9876",
  isContract: false,
  verifiedContract: true
};

jest.mock("src/commons/hooks/useFetch");

describe("ContractDetail page", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: walletAddress,
      loading: false,
      initialized: true,
      error: false,
      lastUpdated: new Date().getTime()
    });
  });

  it("should component render", () => {
    render(<ContractDetail />);
    expect(screen.getByText(/contract details/i)).toBeInTheDocument();
    expect(screen.getByText(/verified script/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view address detail/i })).toBeInTheDocument();
    expect(screen.getByText(walletAddress.address)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: walletAddress.stakeAddress })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /transaction/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /script/i })).toBeInTheDocument();
  });

  it("should user goto the stakekey detail", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <ContractDetail />
      </Router>
    );

    fireEvent.click(screen.getByRole("link", { name: walletAddress.stakeAddress }));
    expect(history.location.pathname).toBe(details.stake(walletAddress.stakeAddress));
  });
});
