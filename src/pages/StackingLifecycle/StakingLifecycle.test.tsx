import { screen } from "@testing-library/react";

import { render } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";

import Dashboard from ".";

const mockData = {
  data: [
    {
      stakeKeyReportId: 331,
      poolReportId: null,
      createdAt: "2023/05/31 08:26:40",
      reportName: "report name test",
      status: "EXPIRED",
      type: "STAKE_KEY"
    }
  ],
  total: 100
};

jest.mock("src/commons/hooks/useFetchList");

describe("StakingLifecycle page", () => {
  it("should render dashboard page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<Dashboard />);
    expect(useFetchList).toBeCalled();
    expect(screen.getByText(/Saved Reports/i)).toBeInTheDocument();
  });

  it("should show correct total results", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    render(<Dashboard />);
    expect(screen.getByText(/Showing 100 results/i)).toBeInTheDocument();
  });

  it("should show correct data in table", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    render(<Dashboard />);
    expect(screen.getByText(/EXPIRED/i)).toBeInTheDocument();
  });
});
