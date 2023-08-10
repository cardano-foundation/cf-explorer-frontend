import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";

import TokenOverview from ".";

const mockTokenMetadata: ITokenMetadata = {
  policy: "token-policy",
  logo: "token-logo.png",
  decimals: 18,
  description: "Token Description",
  ticker: "TKN",
  url: "https://example.com/token"
};

const mockToken: IToken = {
  name: "Token",
  displayName: "Token",
  policy: "token-policy",
  fingerprint: "token-fingerprint",
  txCount: 100,
  supply: 1000,
  createdOn: "2022-01-01",
  metadata: mockTokenMetadata,
  volumeIn24h: 1000000,
  totalVolume: "1000000",
  numberOfHolders: 100,
  tokenType: "ERC-20",
  tokenLastActivity: "2022-01-01",
  metadataJson: "{}"
};

const mockTokenOverview = {
  data: mockToken,
  loading: false,
  currentHolders: 100
};

describe("TokenOverview component", () => {
  it("should component render", () => {
    render(<TokenOverview {...mockTokenOverview} />);
    expect(screen.getByText(/total supply/i)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/example\.com\/token/i)).toBeInTheDocument();
    expect(screen.getByText(/number of holders/i)).toBeInTheDocument();
  });

  it("should user goto token registry page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <TokenOverview {...mockTokenOverview} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /token registry/i }));
    expect(history.location.pathname).toBe("/");
  });
});
