import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { API } from "src/commons/utils/api";
import { formatADA } from "src/commons/utils/helper";

import StakeAnalytics from ".";

const mockStakeAddress = "stake1u8sw8laajleq7w7xpc75axd6ragpmws8xecktmyq5ak2vmqnq54ns";

const mockAnalyticsBalance = {
  data: [
    { date: "2023/12/06 00:00:00", value: 259844577103 },
    { date: "2023/12/06 02:00:00", value: 259844577103 },
    { date: "2023/12/06 04:00:00", value: 259844577103 },
    { date: "2023/12/06 06:00:00", value: 259844577103 },
    { date: "2023/12/06 08:00:00", value: 259844577103 },
    { date: "2023/12/06 10:00:00", value: 259844577103 },
    { date: "2023/12/06 12:00:00", value: 259844577103 },
    { date: "2023/12/06 14:00:00", value: 259844577103 },
    { date: "2023/12/06 16:00:00", value: 259844577103 },
    { date: "2023/12/06 18:00:00", value: 259844577103 },
    { date: "2023/12/06 20:00:00", value: 259844577103 },
    { date: "2023/12/06 22:00:00", value: 259844577103 },
    { date: "2023/12/07 00:00:00", value: 259844577103 }
  ],
  highestBalance: 259844577103,
  lowestBalance: 25984
};

const mockAnalyticsReward = [
  { epoch: 242, value: 455169569 },
  { epoch: 243, value: 0 },
  { epoch: 244, value: 0 },
  { epoch: 245, value: 0 },
  { epoch: 246, value: 0 },
  { epoch: 247, value: 0 },
  { epoch: 248, value: 0 },
  { epoch: 249, value: 372607275 },
  { epoch: 250, value: 0 },
  { epoch: 251, value: 0 },
  { epoch: 252, value: 0 },
  { epoch: 253, value: 551456911 },
  { epoch: 254, value: 0 },
  { epoch: 255, value: 0 }
];

jest.mock("src/commons/hooks/useFetch");

describe("StakeAnalytics component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes(API.STAKE.ANALYTICS_BALANCE)) return { data: mockAnalyticsBalance, loading: false };
      if (url.includes(API.STAKE.ANALYTICS_REWARD)) return { data: mockAnalyticsReward, loading: false };
      if (url.includes(API.STAKE.MIN_MAX_BALANCE)) return { data: [10000, 2000], loading: false };
    });
    render(<StakeAnalytics stakeAddress={mockStakeAddress} />);
  });
  it("should component render", () => {
    expect(screen.getByText(/analytics/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /balance/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reward/i })).toBeInTheDocument();
    ["1d", "1w", "1m", "3m"].forEach((item) => {
      expect(screen.getByRole("button", { name: item })).toBeInTheDocument();
    });
  });

  it("should display analytic balance", () => {
    fireEvent.click(screen.getByRole("button", { name: /balance/i }));
    expect(screen.getByText(formatADA(mockAnalyticsBalance.highestBalance))).toBeInTheDocument();
    expect(screen.getByText(formatADA(mockAnalyticsBalance.lowestBalance))).toBeInTheDocument();
  });

  it("should display analytic reward", () => {
    fireEvent.click(screen.getByRole("button", { name: /reward/i }));
    expect(screen.getByText(formatADA(551456911))).toBeInTheDocument();
    expect(screen.getByText(formatADA(0))).toBeInTheDocument();
  });
});
