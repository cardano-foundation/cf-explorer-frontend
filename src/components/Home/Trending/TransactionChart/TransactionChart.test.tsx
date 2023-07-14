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
jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    )
  };
});

const mockItemDay: TransactionChartIF = {
  date: "2023-06-02 00:00",
  metadata: 9187,
  simpleTransactions: 32908,
  smartContract: 45187
};

const mockItemWeek: TransactionChartIF = {
  date: "2023-06-02 00:00",
  metadata: 19187,
  simpleTransactions: 132908,
  smartContract: 145187
};

const mockItem2Week: TransactionChartIF = {
  date: "2023-06-02 00:00",
  metadata: 29187,
  simpleTransactions: 232908,
  smartContract: 245187
};

const mockItemMonth: TransactionChartIF = {
  date: "2023-06-02 00:00",
  metadata: 49187,
  simpleTransactions: 432908,
  smartContract: 445187
};

const getData = (url: string) => {
  switch (url.split("/")[2]) {
    case "ONE_DAY":
      return mockItemDay;
    case "ONE_WEEK":
      return mockItemWeek;
    case "TWO_WEEK":
      return mockItem2Week;
    default:
      return mockItemMonth;
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

  it("renders Transaction Chart", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <TransactionChart />
      </Router>
    );
    expect(screen.getByText(/Transactions in the last day/i)).toBeInTheDocument();
    const oneDay = screen.getByText("1d");
    const oneWeek = screen.getByText("1w");
    const twoWeek = screen.getByText("2w");
    const oneMonth = screen.getByText("1m");

    expect(oneDay).toBeInTheDocument();
    expect(oneWeek).toBeInTheDocument();
    expect(twoWeek).toBeInTheDocument();
    expect(oneMonth).toBeInTheDocument();

    expect(screen.getByTestId("trx")).toHaveTextContent(numberWithCommas(mockItemDay.simpleTransactions));
    expect(screen.getByTestId("simple")).toHaveTextContent(numberWithCommas(mockItemDay.smartContract));
    expect(screen.getByTestId("complex")).toHaveTextContent(numberWithCommas(mockItemDay.metadata));

    await userEvent.click(twoWeek);
    await waitFor(async () => {
      expect(screen.getByText("Transactions in two weeks")).toBeInTheDocument();
      expect(screen.getByTestId("trx")).toHaveTextContent(numberWithCommas(mockItem2Week.simpleTransactions));
      expect(screen.getByTestId("simple")).toHaveTextContent(numberWithCommas(mockItem2Week.smartContract));
      expect(screen.getByTestId("complex")).toHaveTextContent(numberWithCommas(mockItem2Week.metadata));
    });
  });
});
