import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { formatADAFull } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import StakeOverview from ".";

const mockStakeKeyDetail: IStakeKeyDetail = {
  status: "ACTIVE",
  stakeAddress: "0x123456789abcdef",
  totalStake: 1000,
  rewardAvailable: 500,
  rewardWithdrawn: 200,
  rewardPools: ["Pool 1", "Pool 2"],
  pool: {
    tickerName: "ABC",
    poolName: "Pool ABC",
    poolId: "pool-123",
    iconUrl: "https://example.com/icon.png",
    logoUrl: "https://example.com/logo.png"
  }
};

const mockProps = {
  data: mockStakeKeyDetail,
  loading: false,
  lastUpdated: 1626088800
};

describe("StakeOverview component", () => {
  it("should component render", () => {
    render(<StakeOverview {...mockProps} />);
    expect(screen.getByText(/total stake/i)).toBeInTheDocument();
    expect(screen.getByText(/rewards available/i)).toBeInTheDocument();
    expect(screen.getByText(/rewards withdrawn/i)).toBeInTheDocument();
    expect(screen.getByText(formatADAFull(mockStakeKeyDetail.totalStake))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view all addresses/i })).toBeInTheDocument();
  });

  it("should the button goto detail page click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <StakeOverview {...mockProps} />
      </Router>
    );
    fireEvent.click(screen.getByText(/abc - pool abc/i));
    expect(history.location.pathname).toBe(details.delegation(mockStakeKeyDetail.pool.poolId));
  });
});
