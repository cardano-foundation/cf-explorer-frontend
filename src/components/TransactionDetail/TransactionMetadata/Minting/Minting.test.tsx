import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import Minting from ".";

const mockProps = {
  assetName: "Asset 1",
  assetId: "asset-id-1",
  assetQuantity: 100,
  policy: "policy-1",
  metadata: {
    decimals: 18,
    description: "Asset 1 Description",
    logo: "asset-1-logo.png",
    ticker: "AST1",
    url: "https://example.com/asset1"
  }
};

describe("Minting component", () => {
  it("should component render", () => {
    render(<Minting data={[mockProps]} />);
    expect(screen.getByRole("columnheader", { name: /asset name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /amount minted/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /policy script/i })).toBeInTheDocument();
  });

  it("should user goto detail papge", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <Minting data={[mockProps]} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /asset 1/i }));
    expect(history.location.pathname).toBe(details.token(mockProps.assetId));
  });
});
