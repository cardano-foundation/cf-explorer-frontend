import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { POOL_STATUS } from "src/commons/utils/constants";

import DelegationDetail from ".";

const mockData: DelegationOverview = {
  poolName: "Sample Pool",
  tickerName: "SP",
  poolStatus: POOL_STATUS.ACTIVE,
  poolView: "http://example.com/sample-pool",
  createDate: "2023-07-20",
  rewardAccounts: ["reward_account_1", "reward_account_2"],
  ownerAccounts: ["owner_account_1"],
  poolSize: 1000000,
  stakeLimit: 500000,
  delegators: 50,
  saturation: 0.8,
  reward: 2000,
  ros: 5.0,
  pledge: 100000,
  cost: 50000,
  margin: 2.5,
  epochBlock: 5000,
  totalBalanceOfPoolOwners: 1000000,
  lifetimeBlock: 100000
};

const analyticsDelegators = {
  epochChart: {
    highest: 5000,
    lowest: 1000,
    dataByDays: [
      {
        epochNo: 1,
        totalStake: 100000
      },
      {
        epochNo: 2,
        totalStake: 120000
      },
      {
        epochNo: 3,
        totalStake: 80000
      }
    ]
  },
  delegatorChart: {
    highest: 50,
    lowest: 10,
    dataByDays: [
      {
        epochNo: 1,
        numberDelegator: 20
      },
      {
        epochNo: 2,
        numberDelegator: 25
      },
      {
        epochNo: 3,
        numberDelegator: 15
      }
    ]
  }
};

jest.mock("src/commons/hooks/useFetch");

describe("BlockDetail page", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (url === "delegations/pool-detail-analytics?poolView=undefined") {
        return {
          data: analyticsDelegators,
          loading: false,
          initialized: true,
          error: false,
          lastUpdated: new Date().getTime()
        };
      }
      return {
        data: mockData,
        loading: false,
        initialized: true,
        error: false,
        lastUpdated: new Date().getTime()
      };
    });
  });

  it("should component render", () => {
    render(<DelegationDetail />);
    expect(screen.getByRole("heading", { name: /sample pool/i })).toBeInTheDocument();
    expect(screen.getByText(/reward account/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /reward/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stake/i })).toBeInTheDocument();
  });

  it("should user change chart type", () => {
    render(<DelegationDetail />);
    expect(screen.getByText(/highest stake/i)).toBeInTheDocument();
    expect(screen.getByText(/lowest stake/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /delegator/i }));
    expect(screen.getByText(/highest number of delegators/i)).toBeInTheDocument();
    expect(screen.getByText(/lowest number of delegators/i)).toBeInTheDocument();
  });

  it("should user goto the stakekey detail", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DelegationDetail />
      </Router>
    );

    fireEvent.click(screen.getByRole("link", { name: /reward/ }));
    expect(history.location.pathname).toBe(details.stake(mockData.rewardAccounts[0]));
  });
});
