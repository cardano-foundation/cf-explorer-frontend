import { useHistory, useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

import { render, screen } from "src/test-utils";

import Tabular from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
  useParams: jest.fn()
}));

const mockTabsRenderConfig = {
  hasDeRegistration: true,
  hasDelegation: false,
  hasRegistration: true,
  hasWithdrawal: true,
  hashRewards: false
} as ListStakeKeyResponse;

describe("Tabular", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ stakeId: "123", tab: "registration" });
    (useHistory as jest.Mock).mockReturnValue({ replace: jest.fn() });
  });

  it("renders the Tabular component with the specified tab", () => {
    (useHistory as jest.Mock).mockReturnValue({ replace: jest.fn() });
    render(<Tabular tabsRenderConfig={mockTabsRenderConfig} />);
    expect(screen.getByText(/payment wallet/i)).toBeInTheDocument();
    expect(screen.getByText(/reward account/i)).toBeInTheDocument();
    expect(screen.getByText(/rewards withdrawn/i)).toBeInTheDocument();
  });

  it("component change tabs", async () => {
    const replace = jest.fn();
    (useHistory as jest.Mock).mockReturnValue({ replace });
    render(<Tabular tabsRenderConfig={mockTabsRenderConfig} />);

    const tab1 = screen.getByRole("tab", {
      name: /registrationicon\.svg registration/i
    });
    const tab2 = screen.getByRole("tab", {
      name: /rewardswithdrawalicon\.svg withdrawal history/i
    });

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(screen.getByText(/payment wallet/i)).toBeInTheDocument();
    expect(screen.getByText(/reward account/i)).toBeInTheDocument();
    expect(screen.getByText(/rewards withdrawn/i)).toBeInTheDocument();

    await userEvent.click(tab2);
    await waitFor(() => {
      expect(screen.getByText(/withdrawn\/fees/i)).toBeInTheDocument();
    });
  });
});
