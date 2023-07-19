import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import Contracts from ".";

const mockProps: IContractItemTx = {
  contract: "contract-id",
  address: "contract-address",
  datumBytesIn: "datum-bytes-in",
  datumBytesOut: "datum-bytes-out",
  datumHashIn: "datum-hash-in",
  datumHashOut: "datum-hash-out",
  purpose: "contract-purpose",
  redeemerBytes: "redeemer-bytes",
  redeemerMem: 100,
  redeemerSteps: 200,
  scriptBytes: "script-bytes",
  scriptHash: "script-hash"
};

describe("Contracts component", () => {
  it("should component render", () => {
    render(<Contracts data={[mockProps]} />);
    expect(screen.getByText(/tag/i)).toBeInTheDocument();
    expect(screen.getByText(/contract-purpose/i)).toBeInTheDocument();
    expect(screen.getByText(/data/i)).toBeInTheDocument();
    expect(screen.getByText(/redeemer-bytes/i)).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <Contracts data={[mockProps]} />
      </Router>
    );
    fireEvent.click(screen.getByText(/contract-address/i));
    expect(history.location.pathname).toBe(details.contract(mockProps.address));
  });
});
