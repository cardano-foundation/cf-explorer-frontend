import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import { WithdrawnDraw } from "./index";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useHistory: jest.fn()
}));

jest.mock("src/commons/hooks/useFetch", () => jest.fn());

const mockWithdrawItem = {
  txHash: "mockTxHash12345",
  value: 100,
  time: "2023-06-13T12:00:00Z",
  fee: 10
};

describe("WithdrawnDraw", () => {
  beforeEach(() => {
    const mockedUseSelector = useSelector as jest.Mock;
    const mockedUseParams = useParams as jest.Mock;
    const mockedUseHistory = useHistory as jest.Mock;
    const mockedUseFetch = useFetch as jest.Mock;

    mockedUseSelector.mockReturnValue({ sidebar: 0 });
    mockedUseParams.mockReturnValue({ stakeId: "123" });
    mockedUseHistory.mockReturnValue({ goBack: jest.fn() });
    mockedUseFetch.mockReturnValue({
      data: {
        amount: 100,
        fee: 10,
        stakeRewardAvailable: 50,
        stakeTotalAmount: 200,
        time: "2023-06-13T12:00:00Z",
        txHash: "abc123"
      },
      loading: false
    });
  });

  test("renders component and displays transaction details", () => {
    render(<WithdrawnDraw setSelected={jest.fn()} selected={mockWithdrawItem} showBackButton={true} />);
    expect(screen.getByText(/backicon\.svg/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00009/i)).toBeInTheDocument();
    expect(screen.getByText(/0\.00001/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /abc123/i
      })
    ).toBeInTheDocument();
  });

  test("triggers goBack function when BackIcon is clicked", () => {
    const goBack = jest.fn();
    const mockedUseHistory = useHistory as jest.Mock;
    mockedUseHistory.mockReturnValue({ goBack });

    render(<WithdrawnDraw setSelected={jest.fn()} selected={mockWithdrawItem} showBackButton={true} />);
    const backButton = screen.getByText(/backicon\.svg/i);
    userEvent.click(backButton);

    expect(goBack).toHaveBeenCalled();
  });
});
