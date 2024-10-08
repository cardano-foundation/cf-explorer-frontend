import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import Summary from ".";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

const mockToken = {
  assetName: "Asset 1",
  assetQuantity: 100,
  assetId: "asset-id-1",
  policy: {
    policyId: "policy-id-1",
    totalToken: 1000,
    policyScript: "policy-script-1"
  },
  metadata: {
    decimals: 18,
    description: "Token Description",
    logo: "token-logo.png",
    ticker: "TKN",
    url: "https://example.com/token"
  }
};

const mockSummary = {
  stakeAddress: [{ address: "address-1", value: 100, fee: 10, tokens: [mockToken] }]
};

describe("Summary component", () => {
  it("should component render", () => {
    render(<Summary data={mockSummary} />);
    expect(
      screen.getByRole("img", {
        name: /wallet icon/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Wallet/i)).toBeInTheDocument();
    expect(screen.getByText(/-1/)).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <Summary data={mockSummary} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /-1/ }));
    expect(history.location.pathname).toBe(details.address(mockSummary.stakeAddress[0].address));
  });
});
