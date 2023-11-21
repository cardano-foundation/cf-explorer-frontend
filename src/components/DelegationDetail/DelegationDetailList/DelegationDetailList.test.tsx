import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import { DelegationEpochList, DelegationStakingDelegatorsList } from ".";

const mockEpochList = {
  data: [
    {
      epoch: 447,
      block: 61,
      stakeAmount: 65904_430,
      delegator: 26689,
      fee: 582.382668,
      ros: 123
    },
    {
      epoch: 446,
      block: 58,
      stakeAmount: 14904_430,
      delegator: null,
      fee: 321.31,
      ros: 321
    }
  ],
  loading: false,
  initialized: true,
  total: 10,
  scrollEffect: jest.fn()
};

const mockStakingDelegators = {
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

describe("Epoch List component", () => {
  beforeEach(() => {
    render(<DelegationEpochList {...mockEpochList} />);
  });

  it("should component render", () => {
    expect(screen.getByText("447")).toBeInTheDocument();
    expect(screen.getByText("446")).toBeInTheDocument();
  });
});

describe("DelegationDetailList component", () => {
  it("should component render", () => {
    render(<DelegationStakingDelegatorsList {...mockStakingDelegators} />);
    expect(screen.getByRole("link", { name: /view 1/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view 2/i })).toBeInTheDocument();
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });

  it("should detail page button click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DelegationStakingDelegatorsList {...mockStakingDelegators} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /view 1/i }));
    expect(history.location.pathname).toBe(details.stake(mockStakingDelegators.data[0].view));
  });
});
