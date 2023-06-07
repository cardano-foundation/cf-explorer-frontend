import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";

import ProtocolParameter, { FilterComponent, TableStyled } from "./index";

describe("ProtocolParameter page", () => {
  afterEach(() => {
    cleanup();
  });
  it("should be render page", () => {
    render(<ProtocolParameter />);
    expect(screen.getByText("Updatable Parameters")).toBeInTheDocument();
    expect(screen.getByText("Non-updatable Parameters")).toBeInTheDocument();
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
  it("renders data in the table", () => {
    jest.mock("src/commons/hooks/useFetch", () => ({
      useFetch: () => {
        return {
          data: {
            activeSlotsCoeff: 0.05,
            updateQuorum: 5,
            networkId: "Mainnet testing"
          }
        };
      }
    }));
    waitFor(() => {
      expect(screen.getByText("Mainnet testing")).toBeInTheDocument();
      expect(screen.getByText("0.05")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
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
