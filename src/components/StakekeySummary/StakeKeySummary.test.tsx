import moment from "moment";

import { render, screen } from "src/test-utils";
import { FetchReturnType } from "src/commons/hooks/useFetchList";

import StakekeySummary from ".";

const mockFetchData: FetchReturnType<IStakeKeySummary> = {
  data: [
    {
      id: 1,
      stakeKey: "0x123456789abcdef",
      username: "User 1",
      reportName: "Report 1",
      fromDate: "2023-07-01",
      toDate: "2023-07-10",
      isADATransfer: true,
      isFeesPaid: false,
      status: "Active",
      stakingLifeCycleEvents: [{ type: "Event 1" }, { type: "Event 2" }]
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

const mockProps = {
  fetchData: mockFetchData,
  pagination: { page: 1, size: 10 },
  onSort: jest.fn(),
  onPagination: jest.fn()
};
describe("StakekeySummary component", () => {
  it("should component render", () => {
    render(<StakekeySummary {...mockProps} />);
    const fromDateToDate = screen.getByRole("cell", {
      name: `${moment(mockFetchData.data[0].fromDate).format("MM/DD/YYYY")} - ${moment(
        mockFetchData.data[0].toDate
      ).format("MM/DD/YYYY")}`
    });
    expect(screen.getByText(/report 1/i)).toBeInTheDocument();
    expect(screen.getByText(/active/i)).toBeInTheDocument();
    expect(fromDateToDate).toBeInTheDocument();
  });
});
