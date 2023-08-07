import { render, screen, within } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import AddressWalletDetail from ".";

const tokenMetadata: ITokenMetadata = {
  policy: "token_policy_hash",
  logo: "http://example.com/token_logo.png",
  decimals: 18,
  description: "A sample token description",
  ticker: "TKN",
  url: "http://example.com/token_info"
};

const dataChart = [
  {
    date: "2023/08/02 02:00:00",
    value: 877854256653468
  },
  {
    date: "2023/08/02 04:00:00",
    value: 877854256653468
  }
];

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
  ],
  stakeAddress: "0x13579bdfeca9876",
  isContract: false,
  verifiedContract: true
};

jest.mock("src/commons/hooks/useFetch");

describe("AddressWalletDetail page", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      return {
        data: url.includes("/addresses") ? walletAddress : dataChart,
        loading: false,
        initialized: true,
        error: false
      };
    });
  });
  it("should component render", () => {
    render(<AddressWalletDetail />);
    const heading = screen.getByRole("heading", { name: /transactions/i });
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/address details/i)).toBeInTheDocument();
    expect(within(heading).getByText(/transactions/i)).toBeInTheDocument();
  });
});
