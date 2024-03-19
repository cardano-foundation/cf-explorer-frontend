import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import StakeAnalytics from ".";

const mockAnalyticsBalance = {
  date: "2024/03/18 00:00:00",
  value: 1296226823
};

const mockAnalyticsReward = {
  epoch: 1,
  value: 1000
};

jest.mock("src/commons/hooks/useFetch");

describe("StakeAnalytics component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes(API.STAKE.ANALYTICS_BALANCE))
        return {
          data: { data: [mockAnalyticsBalance], highestBalance: 26085429954, lowestBalance: 1082287804 },
          loading: false
        };
      if (url.includes(API.STAKE.ANALYTICS_REWARD)) return { data: [mockAnalyticsReward], loading: false };
    });
  });
  it("should component render", async () => {
    render(<StakeAnalytics stakeAddress={"stake1uxdklydrvfwjjeandzdd0mzfztkuuvgysc4nu64rdenxyecpvjm8m"} />);
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /balance/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reward/i })).toBeInTheDocument();
    ["1d", "1w", "1m", "3m"].forEach((item) => {
      expect(screen.getByRole("button", { name: item })).toBeInTheDocument();
    });
  });
});
