import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import useADAHandle from "src/commons/hooks/useADAHandle";

import AddressWalletDetail from ".";

const tokenMetadata: ITokenMetadata = {
  policy: "token_policy_hash",
  logo: "http://example.com/token_logo.png",
  decimals: 18,
  description: "A sample token description",
  ticker: "TKN",
  url: "http://example.com/token_info"
};

// const dataChart = [
//   {
//     date: "2023/08/02 02:00:00",
//     value: 877854256653468
//   },
//   {
//     date: "2023/08/02 04:00:00",
//     value: 877854256653468
//   }
// ];

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

jest.mock("src/commons/hooks/useADAHandle");
jest.mock("src/commons/hooks/useFetch");

describe("AddressWalletDetail page", () => {
  beforeEach(() => {
    (useADAHandle as jest.Mock).mockReturnValue([{ data: null, loading: false, initialized: true, error: false }]);
    (useFetch as jest.Mock).mockReturnValue({ data: walletAddress, loading: false, initialized: true, error: false });
    render(<AddressWalletDetail />);
  });
  it("should component render", () => {
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/address details/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Transactions/i })).toBeInTheDocument();
  });
});
