import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import TokenDetail from ".";

const tokenMetadata: ITokenMetadata = {
  policy: "token_policy_hash",
  logo: "http://example.com/token_logo.png",
  decimals: 18,
  description: "A sample token description",
  ticker: "TKN",
  url: "http://example.com/token_info"
};

const token: IToken = {
  name: "Sample Token",
  displayName: "Sample Token (TKN)",
  policy: "token_policy_hash",
  fingerprint: "token_fingerprint",
  txCount: 100,
  supply: 1000000,
  createdOn: "2023-07-20T12:34:56Z",
  metadata: tokenMetadata,
  volumeIn24h: 5000,
  totalVolume: "1000000",
  numberOfHolders: 50,
  tokenType: "ERC20",
  tokenLastActivity: "2023-07-20T10:00:00Z",
  metadataJson: JSON.stringify(tokenMetadata)
};

jest.mock("src/commons/hooks/useFetch");

describe("TokenDetail page", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (!url) return { data: token };
      return { data: null };
    });
  });

  it("should component render", () => {
    render(<TokenDetail />);
    expect(screen.getByText(/number of holders/i)).toBeInTheDocument();
    expect(screen.getByText(/total volume/i)).toBeInTheDocument();
    expect(screen.getByText(/volume 24h/i)).toBeInTheDocument();
    expect(screen.getByText(/token last activity/i)).toBeInTheDocument();
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    ["1d", "1w", "1m", "3m"].forEach((item) => {
      expect(screen.getByRole("button", { name: item })).toBeInTheDocument();
    });
  });
});
