import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen, within } from "src/test-utils";
import { getShortHash, getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import Collaterals from ".";

const mockCollaterals: Transaction["collaterals"] = {
  collateralInputResponses: [
    {
      address: "address-input-1",
      assetId: "asset-id-1",
      index: "index-1",
      txHash: "tx-hash-1",
      value: 100,
      tokens: [
        {
          assetName: "Token 1",
          assetQuantity: 10,
          assetId: "token-asset-id-1",
          policy: {
            policyId: "policy-id-1",
            totalToken: 1000,
            policyScript: "policy-script-1"
          },
          metadata: {
            decimals: 18,
            description: "Token 1 Description",
            logo: "token-1-logo.png",
            ticker: "TKN1",
            url: "https://example.com/token1"
          }
        }
      ]
    }
  ],
  collateralOutputResponses: [
    {
      address: "address-output-1",
      assetId: "asset-id-2",
      index: "index-2",
      txHash: "tx-hash-2",
      value: 200,
      tokens: [
        {
          assetName: "Token 2",
          assetQuantity: 20,
          assetId: "token-asset-id-2",
          policy: {
            policyId: "policy-id-2",
            totalToken: 2000,
            policyScript: "policy-script-2"
          },
          metadata: {
            decimals: 18,
            description: "Token 2 Description",
            logo: "token-2-logo.png",
            ticker: "TKN2",
            url: "https://example.com/token2"
          }
        }
      ]
    }
  ]
};

describe("Collaterals component", () => {
  const { collateralInputResponses } = mockCollaterals;
  it("should component render", () => {
    render(<Collaterals data={mockCollaterals} />);
    const link = screen.getByRole("link", { name: /address-input-1/i });
    const address = within(link).getByText(new RegExp(getShortWallet(collateralInputResponses[0].address), "i"));
    expect(address).toBeInTheDocument();
    expect(screen.getByText(getShortHash(collateralInputResponses[0].txHash))).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <Collaterals data={mockCollaterals} />
      </Router>
    );
    const link = screen.getByRole("link", { name: /address-input-1/i });
    const address = within(link).getByText(new RegExp(getShortWallet(collateralInputResponses[0].address), "i"));
    fireEvent.click(address);
    expect(history.location.pathname).toBe(details.address(collateralInputResponses[0].address));
  });
});
