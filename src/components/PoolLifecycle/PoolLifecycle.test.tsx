import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";
import { FetchReturnType } from "src/commons/hooks/useFetchList";

import PoolLifecycle, { IPoolLifecycleProps } from ".";

const mockFetchData: FetchReturnType<IPoolReportList> = {
  data: [
    {
      reportName: "Report 1",
      epochRanges: [1, 2, 3],
      toDate: "2023-07-11",
      isPoolSize: true,
      isFeesPaid: false,
      event: "Event 1",
      reportId: 1,
      eventDeregistration: true,
      eventPoolUpdate: false,
      eventRegistration: true,
      eventReward: true,
      poolView: "Pool 1",
      createdAt: "2023-07-10",
      status: "IN_PROGRESS",
      reportHistory: {
        id: 1,
        storageKey: "key1",
        reportName: "Report 1",
        username: "User 1",
        createdAt: "2023-07-10",
        status: "InProgress",
        type: "Type 1"
      }
    }
  ],
  loading: false,
  error: null,
  initialized: true,
  total: 1,
  totalPage: 1,
  currentPage: 1,
  refresh: jest.fn(),
  update: jest.fn(),
  lastUpdated: 1626088800
};

const mockProps: IPoolLifecycleProps = {
  fetchData: mockFetchData,
  pagination: { page: 1, size: 10 },
  onSort: jest.fn(),
  onPagination: jest.fn()
};

describe("PoolLifecycle component", () => {
  it("should component render", () => {
    render(<PoolLifecycle {...mockProps} />);
    expect(screen.getByText(/in progress/i)).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /deregistration, registration, reward, pool size/i })).toBeInTheDocument();
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });

  it("should component render", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <PoolLifecycle {...mockProps} />
      </Router>
    );
    fireEvent.click(screen.getByText(/in progress/i));
    expect(history.location.pathname).toBe("/report-generated/1/pool");
  });
});
