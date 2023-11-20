import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

import { render, screen } from "src/test-utils";
import { RegistrationIcon, RewardsWithdrawalIcon } from "src/commons/resources";

import StakeRegistrationTab from "./Tabs/StakeRegistrationTab";
import WithdrawalHistoryTab from "./Tabs/WithdrawalHistoryTab";

import StakeTab from "./index";

const tabs = [
  {
    icon: RegistrationIcon,
    label: "Registration",
    key: "registration",
    component: <StakeRegistrationTab />,
    keyCheckShow: "hasRegistration"
  },
  {
    icon: RewardsWithdrawalIcon,
    label: "Withdrawal History",
    key: "withdrawal-history",
    component: <WithdrawalHistoryTab />,
    keyCheckShow: "hasWithdrawal"
  }
];
describe("StakeTab", () => {
  it("should component renders", () => {
    render(<StakeTab tabs={tabs} />);

    const tab1 = screen.getByText("Registration");
    const tab2 = screen.getByText("Withdrawal History");

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
  });

  it("should component change tab", async () => {
    render(<StakeTab tabs={tabs} />);
    const tab1 = screen.getByText("Registration");
    const tab2 = screen.getByText("Withdrawal History");

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(screen.getByText(/RegistrationIcon.svg/i)).toBeInTheDocument();
    await userEvent.click(tab2);
    await waitFor(() => {
      expect(screen.getByText(/RewardsWithdrawalIcon.svg/i)).toBeInTheDocument();
    });
  });
});
