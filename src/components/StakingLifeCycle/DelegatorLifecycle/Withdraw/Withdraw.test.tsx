import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { render, screen } from "src/test-utils";

import Withdraw from "./index";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useHistory: jest.fn()
}));

describe("WithdrawnDraw", () => {
  beforeEach(() => {
    const mockedUseSelector = useSelector as jest.Mock;
    const mockedUseParams = useParams as jest.Mock;
    const mockedUseHistory = useHistory as jest.Mock;

    mockedUseSelector.mockReturnValue({ sidebar: 0 });
    mockedUseParams.mockReturnValue({ stakeId: "123" });
    mockedUseHistory.mockReturnValue({ goBack: jest.fn() });
  });

  test("renders component and displays transaction details", () => {
    render(<Withdraw />);
    expect(screen.getByText(/recent withdrawals/i)).toBeInTheDocument();
  });
});
