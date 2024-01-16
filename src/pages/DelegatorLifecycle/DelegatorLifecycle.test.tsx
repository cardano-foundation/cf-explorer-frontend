import useFetch from "src/commons/hooks/useFetch";
import { render, screen } from "src/test-utils";

import DelegatorLifecycle from ".";

const stakeKeyDetail: IStakeKeyDetail = {
  status: "ACTIVE",
  stakeAddress: "0x0123456789abcdef",
  totalStake: 10000,
  rewardAvailable: 500,
  rewardWithdrawn: 200,
  rewardPools: ["reward_pool_1", "reward_pool_2"],
  pool: {
    tickerName: "POOL",
    poolName: "Sample Pool",
    poolId: "pool_id_123",
    iconUrl: "http://example.com/pool_icon.png",
    logoUrl: "http://example.com/pool_logo.png"
  }
};
const response = {
  hasDeRegistration: false,
  hasDelegation: true,
  hasRegistration: true,
  hasWithdrawal: false,
  hashRewards: true,
  someOtherKey: true
};
jest.mock("src/commons/hooks/useFetch");

describe("BlockDetail page", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (url === "stakes/") {
        return { data: stakeKeyDetail, loading: false, error: false, initialized: true };
      }
      return { data: response, loading: false, error: false, initialized: true };
    });
  });

  it("should component render", () => {
    render(<DelegatorLifecycle />);
    expect(screen.getByRole("heading", { name: /staking delegation lifecycle/i })).toBeInTheDocument();
    expect(screen.getByText(/switch to tabular view/i)).toBeInTheDocument();
    expect(screen.getByTestId("chartmode")).toBeInTheDocument();
  });
});
