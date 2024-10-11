import { cleanup, screen, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { numberWithCommas } from "src/commons/utils/helper";

import TransactionChart, { TransactionChartIF } from ".";

jest.mock("src/commons/hooks/useFetch");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

const mockItemOneMonth: TransactionChartIF = {
  date: "2023-06-02 00:00",
  metadata: 9187,
  simpleTransactions: 32908,
  smartContract: 45187
};

const mockItemOneYear: TransactionChartIF = {
  date: "2023-06-02 00:00",
  metadata: 29187,
  simpleTransactions: 232908,
  smartContract: 245187
};

const getData = (url: string) => {
  switch (url.split("/")[2]) {
    case "ONE_MONTH":
      return mockItemOneMonth;
    case "ONE_YEAR":
      return mockItemOneYear;
    default:
      return mockItemOneMonth;
  }
};

describe("TransactionChart", () => {
  beforeEach(() => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockUseSelector = useSelector as jest.Mock;
    mockUseFetch.mockImplementation((url) => {
      return { data: [getData(url)], loading: false, initialized: true };
    });
    mockUseSelector.mockReturnValue({ sidebar: true });
  });

  afterEach(() => {
    cleanup();
  });

  it("Test", () => {
    render(<TransactionChart />);
    expect(screen.getByText(/Transaction history/i)).toBeInTheDocument();
  });

  it("renders Transaction Chart", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <TransactionChart />
      </Router>
    );
    expect(screen.getByText(/Transaction history/i)).toBeInTheDocument();
    const threeYear = screen.getByText("3y");
    const threeMonth = screen.getByText("3m");
    const oneYear = screen.getByText("1y");
    const oneMonth = screen.getByText("1m");

    expect(threeYear).toBeInTheDocument();
    expect(threeMonth).toBeInTheDocument();
    expect(oneYear).toBeInTheDocument();
    expect(oneMonth).toBeInTheDocument();

    expect(screen.getByTestId("trx")).toHaveTextContent(numberWithCommas(mockItemOneMonth.metadata || 0));
    expect(screen.getByTestId("simple")).toHaveTextContent(numberWithCommas(mockItemOneMonth.smartContract || 0));
    expect(screen.getByTestId("complex")).toHaveTextContent(numberWithCommas(mockItemOneMonth.simpleTransactions || 0));

    await userEvent.click(oneYear);
    await waitFor(async () => {
      expect(screen.getByText("Transaction history")).toBeInTheDocument();
      expect(screen.getByTestId("trx")).toHaveTextContent(numberWithCommas(mockItemOneYear.metadata || 0));
      expect(screen.getByTestId("simple")).toHaveTextContent(numberWithCommas(mockItemOneYear.smartContract || 0));
      expect(screen.getByTestId("complex")).toHaveTextContent(
        numberWithCommas(mockItemOneYear.simpleTransactions || 0)
      );
    });
  });
});
