import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { getShortHash, getShortWallet } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import UTXO from ".";

const mockData = {
  inputs: [
    {
      address: "address-1",
      value: 100,
      txHash: "hash-1",
      index: "index-1",
      tokens: [],
      stakeAddress: "stake-address-1"
    },
    { address: "address-2", value: 200, txHash: "hash-2", index: "index-2", tokens: [] }
  ],
  outputs: [
    {
      address: "address-3",
      value: 300,
      txHash: "hash-3",
      tokens: [],
      index: "index-3",
      stakeAddress: "stake-address-2"
    },
    { address: "address-4", value: 400, txHash: "hash-4", tokens: [], index: "index-4" }
  ]
};
describe("UTXO component", () => {
  it("should component render", () => {
    const [input] = mockData.inputs;
    render(<UTXO data={mockData} fee={10000} />);
    expect(screen.getByText(getShortWallet(input.address))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(input.index, "i"))).toBeInTheDocument();
    expect(screen.getByText(getShortHash(input.txHash))).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const [input] = mockData.inputs;
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <UTXO data={mockData} fee={10000} />
      </Router>
    );
    fireEvent.click(screen.getByText(getShortWallet(input.address)));
    expect(history.location.pathname).toBe(details.address(input.address));
  });
});
