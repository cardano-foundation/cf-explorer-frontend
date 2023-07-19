import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import Withdrawals from ".";

const mockData: Transaction["withdrawals"] = [
  {
    stakeAddressFrom: "stake-address-1",
    addressTo: ["address-1", "address-2"],
    amount: 0
  },
  {
    stakeAddressFrom: "stake-address-2",
    addressTo: ["address-3"],
    amount: 0
  }
];

describe("Withdrawals component", () => {
  it("should component render", () => {
    const [data] = mockData;
    render(<Withdrawals data={mockData} />);
    expect(screen.getByText(/wallet addresses/i)).toBeInTheDocument();
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: data.stakeAddressFrom })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: data.addressTo[0] })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: data.addressTo[1] })).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const [data] = mockData;
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <Withdrawals data={mockData} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: data.stakeAddressFrom }));
    expect(history.location.pathname).toBe(details.stake(data.stakeAddressFrom));
  });
});
