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
    const mockedData: RewardDistributionStaking = {
      hasLeaderReward: true,
      hasMemberReward: true,
      rewardAvailable: 500,
      stakeAddress: "stake1uxrkez465cmpdrragd3rhcgrc6lllnasxd7qtl735l489egx9yfxe"
    };
    render(<RewardsDistributionDraw toggleRewardModal={jest.fn()} data={mockedData} setTypeRewardModal={jest.fn()} />);
    expect(screen.getByText(/0\.0005/i)).toBeInTheDocument();
  });

  it("should component renders", () => {
    const mockedData: RewardDistributionStaking = {
      hasLeaderReward: true,
      hasMemberReward: true,
      rewardAvailable: 500,
      stakeAddress: "stake1uxrkez465cmpdrragd3rhcgrc6lllnasxd7qtl735l489egx9yfxe"
    };
    const toggleRewardModal = jest.fn();

    render(
      <RewardsDistributionDraw toggleRewardModal={toggleRewardModal} data={mockedData} setTypeRewardModal={jest.fn()} />
    );
    expect(screen.getByText(/0\.0005/i)).toBeInTheDocument();
  });
});
