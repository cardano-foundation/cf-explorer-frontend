import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";

import TokenAnalytics from ".";

const mockAnalyticsData = {
  date: "2023-07-11",
  value: 1000
};

jest.mock("src/commons/hooks/useFetchList");

describe("TokenAnalytics component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockAnalyticsData] });
  });
  it("should component render", () => {
    render(<TokenAnalytics />);
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /volume/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /3m/i })).toBeInTheDocument();
  });
});
