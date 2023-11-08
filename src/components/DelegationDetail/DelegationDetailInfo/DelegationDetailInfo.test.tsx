import { render, screen } from "src/test-utils";

import DelegationDetailInfo, { IDelegationDetailInfo } from ".";

const mockProps: IDelegationDetailInfo = {
  data: {
    poolName: "Sample Pool",
    tickerName: "TICKER",
    poolView: "pool1abc",
    createDate: "2022-01-01",
    rewardAccounts: ["rewardAccount1", "rewardAccount2"],
    ownerAccounts: ["ownerAccount1", "ownerAccount2"],
    poolSize: 1000000,
    stakeLimit: 500000,
    delegators: 100,
    saturation: 0.8,
    reward: 5000,
    ros: 5,
    pledge: 100000,
    cost: 1000,
    margin: 0.03,
    totalBalanceOfPoolOwners: 1000000,
    epochBlock: 1000,
    lifetimeBlock: 5000
  },
  loading: false,
  poolId: "#poolId123"
};

describe("DelegationDetailInfo component", () => {
  it("should component render", () => {
    render(<DelegationDetailInfo {...mockProps} />);
    expect(screen.getByRole("heading", { name: /sample pool/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /please sign in to save your bookmark/i })).toBeInTheDocument();
  });
});
