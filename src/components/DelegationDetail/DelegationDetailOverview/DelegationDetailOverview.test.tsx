import { render, screen } from "src/test-utils";

import DelegationDetailOverview from ".";

const mockData = {
  poolName: "Pool ABC",
  tickerName: "ABC",
  poolView: "View 1",
  createDate: "2023-07-11",
  rewardAccounts: ["account1", "account2"],
  ownerAccounts: ["owner1", "owner2"],
  poolSize: 100,
  stakeLimit: 5000,
  delegators: 50,
  saturation: 0.8,
  reward: 500,
  ros: 5,
  pledge: 1000,
  cost: 50,
  margin: 2,
  epochBlock: 100,
  lifetimeBlock: 10000
};

const mockProps = {
  data: mockData,
  loading: false
};

describe("DelegationDetailOverview component", () => {
  it("should component render", () => {
    render(<DelegationDetailOverview {...mockProps} />);
    expect(screen.getByText(/margin/i)).toBeInTheDocument();
    expect(screen.getByText(/pledge\(a\)/i)).toBeInTheDocument();
    expect(screen.getByText(/epoch block/i)).toBeInTheDocument();
  });
});
