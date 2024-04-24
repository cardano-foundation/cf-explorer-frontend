import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
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

const mockDataPoolList = [
  {
    id: 1,
    poolId: "pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt",
    poolName: "OctasPool",
    tickerName: "OCTAS",
    poolSize: 70589891351080,
    pledge: 530000000000,
    saturation: 95.13,
    epochBlock: 40,
    lifetimeBlock: 12111,
    votingPower: 0.0031181818937964724,
    governanceParticipationRate: 0,
    retired: false
  }
];

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
      if (url === "delegations/pool-list?query=undefined") {
        return {
          data: mockDataPoolList
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

  it("should component render", async () => {
    render(<DelegationDetail />);
    await new Promise((r) => setTimeout(r, 500));
    // expect(screen.getByText(/Reward Account/i)).toBeInTheDocument(); *To Do
    expect(screen.getByRole("button", { name: /stake/i })).toBeInTheDocument();
  });

  it("should user change chart type", () => {
    render(<DelegationDetail />);
    expect(screen.getByText(/highest stake/i)).toBeInTheDocument();
    expect(screen.getByText(/lowest stake/i)).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: /delegator/i })[0]);
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
  });
});
