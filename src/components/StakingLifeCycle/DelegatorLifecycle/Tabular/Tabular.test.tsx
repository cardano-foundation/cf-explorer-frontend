import { useHistory, useParams } from "react-router-dom";

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
  });

  it("component change tabs", async () => {
    const replace = jest.fn();
    (useHistory as jest.Mock).mockReturnValue({ replace });
    render(<Tabular tabsRenderConfig={mockTabsRenderConfig} />);

    const tab1 = screen.getAllByText(/Registration/i)[0];
    const tab2 = screen.getAllByText(/Rewards Withdrawn/i)[0];

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(screen.getAllByText(/payment wallet/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/reward account/i)[0]).toBeInTheDocument();
  });
});
