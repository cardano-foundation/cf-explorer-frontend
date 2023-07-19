import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import AddressOverview from ".";

const mockData: WalletAddress = {
  address: "0x1234567890abcdef",
  txCount: 10,
  balance: 1000,
  tokens: [
    {
      address: "0x0987654321fedcba",
      name: "Token",
      displayName: "Token",
      fingerprint: "fingerprint123",
      quantity: 500,
      metadata: {
        decimals: 18,
        description: "Token Description",
        logo: "token-logo.png",
        ticker: "TKN",
        url: "https://example.com/token"
      }
    }
  ],
  stakeAddress: "0x9876543210abcdef",
  isContract: false,
  verifiedContract: true
};

describe("AddressOverview component", () => {
  it("should component render", () => {
    render(<AddressOverview data={mockData} loading={false} />);
    expect(screen.getByText(/contract detail/i)).toBeInTheDocument();
    expect(screen.getByText(/verified script/i)).toBeInTheDocument();
    expect(screen.getByText(mockData.address)).toBeInTheDocument();
  });

  it("should component redirect to detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <AddressOverview data={mockData} loading={false} />
      </Router>
    );
    fireEvent.click(screen.getByRole("button", { name: /view address detail/i }));
    expect(history.location.pathname).toBe(details.address(mockData.address));
  });
});
