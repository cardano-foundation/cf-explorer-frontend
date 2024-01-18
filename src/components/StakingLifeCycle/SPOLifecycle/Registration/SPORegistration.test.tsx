import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import Registration from ".";
const mockData: SPORegistrationDetail = {
  cost: 1000,
  deposit: 5000,
  fee: 100,
  margin: 0.05,
  pledge: 10000,
  poolId: "poolId123",
  poolName: "MyPool",
  poolView: "poolView123",
  rewardAccount: "rewardAccount123",
  stakeKeys: ["stakeKey1", "stakeKey2"],
  time: "2023-07-03T12:34:56Z",
  totalFee: 500,
  txHash: "txHash123",
  vrfKey: "vrfKey123"
};

jest.mock("src/commons/hooks/useFetch");

describe("RegistrationDraw component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData
    });
  });
  it("should component render", () => {
    render(<Registration />);
    expect(screen.getByText(/registration list/i)).toBeInTheDocument();
    const filterIC = screen.getByRole("button", {
      name: /filter/i
    });
    expect(filterIC).toBeInTheDocument();
  });
});
