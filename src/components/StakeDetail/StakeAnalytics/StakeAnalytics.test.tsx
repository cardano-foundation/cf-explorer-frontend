import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";

import StakeAnalytics from ".";

const mockAnalyticsBalance = {
  date: "2023-07-11",
  value: 1000
};

const mockAnalyticsReward = {
  epoch: 1,
  value: 1000
};

jest.mock("src/commons/hooks/useFetch");

describe("StakeAnalytics component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes(API.STAKE.ANALYTICS_BALANCE)) return { data: [mockAnalyticsBalance], loading: false };
      if (url.includes(API.STAKE.ANALYTICS_REWARD)) return { data: [mockAnalyticsReward], loading: false };
      if (url.includes(API.STAKE.MIN_MAX_BALANCE)) return { data: [10000, 2000], loading: false };
    });
  });
  it("should component render", () => {
    render(<StakeAnalytics />);
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /balance/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reward/i })).toBeInTheDocument();
    ["1d", "1w", "1m", "3m"].forEach((item) => {
      expect(screen.getByRole("button", { name: item })).toBeInTheDocument();
    });
  });
});
