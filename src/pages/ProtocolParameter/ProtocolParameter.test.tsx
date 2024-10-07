/* eslint-disable import/order */
import { cleanup, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// eslint-disable-next-line import/no-unresolved
import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import ProtocolParameter, { FilterComponent } from "./index";

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
    expect(screen.getByText("Protocol Parameters")).toBeInTheDocument();
    expect(screen.getByText("Network group")).toBeInTheDocument();
    expect(screen.getByText(/View update history/i)).toBeInTheDocument();
  });

  it("renders data in the table", async () => {
    render(<ProtocolParameter />);
    expect(screen.getByText(/Economic Group/)).toBeInTheDocument();
    expect(screen.getByText(/Technical Group/)).toBeInTheDocument();
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
  });
});
