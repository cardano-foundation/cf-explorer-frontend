import { useHistory } from "react-router-dom";

import { render, screen } from "src/test-utils";

import StakingLifeCycleSearch from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn()
}));
describe("StakingLifeCycleSearch", () => {
  beforeEach(() => {
    const mockedUseHistory = useHistory as jest.Mock;
    mockedUseHistory.mockReturnValue({ push: jest.fn() });
  });
  it("should component renders", () => {
    render(<StakingLifeCycleSearch />);
    expect(
      screen.getAllByText(/search to explore the staking lifecycle events of a delegator or pool\./i)[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", {
        name: /search/i
      })[0]
    ).toBeInTheDocument();
  });

  it("should component strigger searching actions", () => {
    const push = jest.fn();
    const mockedUseHistory = useHistory as jest.Mock;
    mockedUseHistory.mockReturnValue({ push });
    render(<StakingLifeCycleSearch />);
    const textBox = screen.getByRole("searchbox");
    const btnSearch = screen.getAllByRole("button", {
      name: /search/i
    });
    expect(textBox).toBeInTheDocument();
    expect(btnSearch[0]).toBeInTheDocument();
  });
});
