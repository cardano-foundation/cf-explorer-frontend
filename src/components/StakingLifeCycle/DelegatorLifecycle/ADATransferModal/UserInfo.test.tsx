import { render, screen } from "src/test-utils";
import { getShortHash } from "src/commons/utils/helper";

import UserInfo from "./UserInfo";

describe("UserInfo", () => {
  it("renders user information correctly", () => {
    const total = 10;
    const stake = "0xabcdef1234567890";
    const reward = 500;
    const active = "wallet";

    render(<UserInfo total={total} stake={stake} reward={reward} acitve={active} />);

    const stakeElement = screen.getByText(getShortHash(stake));
    const rewardElement = screen.getByText(/Total balance including reward/i);
    const transactionElement = screen.getByText("10 Transactions");

    expect(stakeElement).toBeInTheDocument();
    expect(rewardElement).toBeInTheDocument();
    expect(transactionElement).toBeInTheDocument();
  });
});
