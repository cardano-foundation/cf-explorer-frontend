import { render, screen } from "src/test-utils";

import ADAHolderRect from "./ADAHolderRect";
import ADAOperatorRewardRect from "./ADAOperatorRewardRect";
import RewardAccountBox from "./RewardAccountBox";

import RewardsDistributionDraw from "./index";

describe("ADAHolderRect", () => {
  it("should component renders", () => {
    render(<ADAHolderRect />);
    expect(screen.getByText(/ada holder/i)).toBeInTheDocument();
  });
});

describe("ADAOperatorRewardRect", () => {
  it("should component renders", () => {
    render(<ADAOperatorRewardRect />);
    expect(screen.getByText(/operator reward \(spo\)/i)).toBeInTheDocument();
  });

  it("should component was disabled", () => {
    render(<ADAOperatorRewardRect disabled={true} />);
    expect(screen.getByText(/operator reward \(spo\)/i).getAttribute("disabled")).toBe("");
  });
});

describe("RewardAccountBox", () => {
  it("should component renders", () => {
    render(<RewardAccountBox value={10000000} toggleRewardModal={jest.fn()} />);
    expect(screen.getByText(/reward account/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});

describe("RewardsDistributionDraw", () => {
  it("should component renders", () => {
    const mockedData: IStakeKeyDetail = {
      status: "ACTIVE",
      stakeAddress: "0xabc123",
      totalStake: 1000,
      rewardAvailable: 500,
      rewardWithdrawn: 200,
      rewardPools: ["pool1", "pool2"],
      pool: {
        tickerName: "TICK",
        poolName: "Example Pool",
        poolId: "pool1"
      }
    };
    render(<RewardsDistributionDraw toggleRewardModal={jest.fn()} data={mockedData} setTypeRewardModal={jest.fn()} />);
    expect(screen.getByText(/0\.0005/i)).toBeInTheDocument();
  });

  it("should component renders", () => {
    const mockedData: IStakeKeyDetail = {
      status: "ACTIVE",
      stakeAddress: "0xabc123",
      totalStake: 1000,
      rewardAvailable: 500,
      rewardWithdrawn: 200,
      rewardPools: ["pool1", "pool2"],
      pool: {
        tickerName: "TICK",
        poolName: "Example Pool",
        poolId: "pool1"
      }
    };
    const toggleRewardModal = jest.fn();

    render(
      <RewardsDistributionDraw toggleRewardModal={toggleRewardModal} data={mockedData} setTypeRewardModal={jest.fn()} />
    );
    expect(screen.getByText(/0\.0005/i)).toBeInTheDocument();
  });
});
