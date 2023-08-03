import { cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import ProtocolParameter, { FilterComponent, TableStyled } from "./index";

jest.mock("src/commons/hooks/useFetch");

const mockData = {
  activeSlotsCoeff: 0.05,
  updateQuorum: 5,
  networkId: "Mainnet testing"
};

describe("ProtocolParameter page", () => {
  beforeEach(() => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData });
  });
  afterEach(() => {
    cleanup();
  });

  it("should be render page", () => {
    render(<ProtocolParameter />);
    expect(screen.getByText("Updatable Parameters")).toBeInTheDocument();
    expect(screen.getByText("Global Constants")).toBeInTheDocument();
    expect(screen.getByText("View update history")).toBeInTheDocument();
  });
  it("renders the table with given columns and data", () => {
    const columns = [
      {
        title: "Test Column",
        key: "test",
        render: (r: any) => <div>{r.test}</div>
      }
    ];

    const data = [
      {
        test: "Test Data"
      }
    ];

    render(<TableStyled columns={columns} data={data} loading={false} />);

    expect(screen.getByText("Test Column")).toBeInTheDocument();
    expect(screen.getByText("Test Data")).toBeInTheDocument();
  });
  it("renders data in the table", async () => {
    render(<ProtocolParameter />);
    expect(screen.getByText(/Updatable Parameters/)).toBeInTheDocument();
    expect(screen.getByText(/Global Constants/)).toBeInTheDocument();
  });
});

describe("FilterComponent", () => {
  it("should render filter options and handle filter changes", () => {
    const setFilterParams = jest.fn();
    const setResetFilter = jest.fn();
    const setShowFiter = jest.fn();
    const setSortTimeFilter = jest.fn();
    const setDateRangeFilter = jest.fn();

    render(
      <FilterComponent
        filterParams={[]}
        sortTimeFilter=""
        setFilterParams={setFilterParams}
        setResetFilter={setResetFilter}
        setShowFiter={setShowFiter}
        setSortTimeFilter={setSortTimeFilter}
        dateRangeFilter={{}}
        setDateRangeFilter={setDateRangeFilter}
      />
    );

    expect(screen.getByText("Latest - First")).toBeInTheDocument();
    expect(screen.getByText("First - Latest")).toBeInTheDocument();
    expect(screen.getByText("Date range")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Latest - First"));
    fireEvent.click(screen.getByTestId("apply-filters"));
    expect(setSortTimeFilter).toHaveBeenCalledTimes(1);
  });
});
