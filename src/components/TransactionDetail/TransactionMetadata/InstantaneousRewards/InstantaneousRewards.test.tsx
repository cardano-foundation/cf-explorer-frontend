import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import InstantaneousRewards from ".";

const mockProps = { amount: "100", stakeAddress: "stake-address-1" };
describe("InstantaneousRewards component", () => {
  it("should component render", () => {
    const { getAllByTestId, getAllByText } = render(<InstantaneousRewards data={[mockProps]} />);
    screen.logTestingPlaygroundURL();
    expect(getAllByText("Stake Address").length).toBeGreaterThan(0);
    const addressStakeKeys = getAllByTestId(`stake-item-${mockProps.stakeAddress}`);
    expect(addressStakeKeys.length).toBeGreaterThan(0);
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <InstantaneousRewards data={[mockProps]} />
      </Router>
    );
    const addressStakeKeys = screen.getAllByTestId(`stake-item-${mockProps.stakeAddress}`);
    if (addressStakeKeys.length) {
      fireEvent.click(addressStakeKeys[0]);
      expect(history.location.pathname).toBe(details.stake(mockProps.stakeAddress));
    }
  });
});
