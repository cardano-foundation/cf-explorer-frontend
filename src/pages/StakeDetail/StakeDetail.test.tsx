import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import StakeDetail from ".";

const mockData = {
  status: "ACTIVE",
  stakeAddress: "0x0123456789abcdef",
  totalStake: 10000,
  rewardAvailable: 500,
  rewardWithdrawn: 200,
  rewardPools: ["reward_pool_1", "reward_pool_2"],
  pool: {
    tickerName: "POOL",
    poolName: "Sample Pool",
    poolId: "pool_id_123",
    iconUrl: "http://example.com/pool_icon.png",
    logoUrl: "http://example.com/pool_logo.png"
  }
};

jest.mock("src/commons/hooks/useFetch");

describe("StakeDetail page", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (url !== "stakes/undefined") {
        return {
          data: null
        };
      }
      return {
        data: mockData
      };
    });
  });
  it("should component render", () => {
    render(<StakeDetail />);
    expect(screen.getByText(mockData.stakeAddress)).toBeInTheDocument();
    expect(screen.getByText(/stake key details/i)).toBeInTheDocument();
    expect(screen.getByText(/delegated to/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockData.pool.tickerName} - ${mockData.pool.poolName}`)).toBeInTheDocument();
  });

  it("should user goto stake detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <StakeDetail />
      </Router>
    );
    fireEvent.click(screen.getByText(`${mockData.pool.tickerName} - ${mockData.pool.poolName}`));
    expect(history.location.pathname).toBe(details.delegation(mockData.pool.poolId));
  });
});
