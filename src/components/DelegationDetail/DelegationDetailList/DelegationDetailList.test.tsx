import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import { DelegationStakingDelegatorsList } from ".";

const mockProps = {
  data: [
    {
      address: "0x123456789",
      view: "View 1",
      totalStake: 1000,
      time: "2023-07-11",
      fee: 0.05
    },
    {
      address: "0x987654321",
      view: "View 2",
      totalStake: 500,
      time: "2023-07-12",
      fee: 0.02
    }
  ],
  loading: false,
  initialized: true,
  total: 10,
  scrollEffect: jest.fn()
};
describe("DelegationDetailList component", () => {
  it("should component render", () => {
    render(<DelegationStakingDelegatorsList {...mockProps} />);
    expect(screen.getByRole("link", { name: /view 1/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view 2/i })).toBeInTheDocument();
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });

  it("should detail page button click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DelegationStakingDelegatorsList {...mockProps} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /view 1/i }));
    expect(history.location.pathname).toBe(details.stake(mockProps.data[0].view));
  });
});
