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

    const tab1 = screen.getByRole("tab", {
      name: /registrationicon\.svg registration/i
    });
    const tab2 = screen.getByRole("tab", {
      name: /rewardswithdrawalicon\.svg withdrawal history/i
    });

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
  });

  it("should component change tab", async () => {
    render(<StakeTab tabs={tabs} />);
    const tab1 = screen.getByRole("tab", {
      name: /registrationicon\.svg registration/i
    });
    const tab2 = screen.getByRole("tab", {
      name: /rewardswithdrawalicon\.svg withdrawal history/i
    });

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", {
        name: /certificate/i
      })
    ).toBeInTheDocument();
    await userEvent.click(tab2);
    await waitFor(() => {
      expect(screen.getByText(/withdrawn\/fees/i)).toBeInTheDocument();
    });
  });
});
