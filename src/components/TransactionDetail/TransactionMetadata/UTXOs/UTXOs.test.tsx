import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { render, screen } from "src/test-utils";

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
    expect(screen.getAllByTestId("ellipsis-text")[0]).toBeInTheDocument();
    expect(screen.getByText(new RegExp(input.index, "i"))).toBeInTheDocument();
    expect(screen.getAllByTestId("ellipsis-text")[1]).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <UTXO data={mockData} fee={10000} />
      </Router>
    );
    expect(screen.getAllByTestId("ellipsis-text")[1]).toBeInTheDocument();
  });
});
