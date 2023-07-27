import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";

import { render, screen } from "src/test-utils";

import StakingLifeCycleSearch from "./index";

const mockedStateKey = "stakekey1234";

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
      screen.getByText(/search to explore the staking lifecycle events of a delegator or pool\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /search/i
      })
    ).toBeInTheDocument();
  });

  it("should component strigger searching actions", () => {
    const push = jest.fn();
    const mockedUseHistory = useHistory as jest.Mock;
    mockedUseHistory.mockReturnValue({ push });
    render(<StakingLifeCycleSearch />);
    const textBox = screen.getByRole("textbox");
    const btnSearch = screen.getByRole("button", {
      name: /search/i
    });
    expect(textBox).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();

    userEvent.type(textBox, mockedStateKey);
    userEvent.click(btnSearch);

    expect(push).toBeCalled();
  });
});
