import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";

import DelegationLists from ".";

const mockData: Delegators = {
  poolId: "mock-pool-id",
  poolName: "Mock Pool",
  poolSize: 100,
  reward: 500,
  feePercent: 2,
  feeAmount: 10,
  pledge: 1000,
  saturation: 0.8,
  stakeLimit: undefined,
  numberDelegators: 50,
  lifetimeBlock: 10000,
  lifetimeRos: 5,
  epochBlock: 100
};

jest.mock("src/commons/hooks/useFetchList");

describe("DelegationList component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockData]
    });
  });
  it("should component render", () => {
    render(<DelegationLists />);
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /mock pool/i })).toBeInTheDocument();
  });

  it("should goto detail page button clicked", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DelegationLists />
      </Router>
    );
    fireEvent.click(screen.getByText(/mock pool/i));
    expect(history.location.pathname).toBe(details.delegation(mockData.poolId));
  });
});
