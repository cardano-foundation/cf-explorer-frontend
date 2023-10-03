import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

import { render, screen, act } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import DetailViewStakeKey from "./DetailViewStakeKey";

const mockStake = "stakeAddress123";
const mockData: IStakeKeyDetail = {
  status: "ACTIVE",
  stakeAddress: "stakeAddress123",
  totalStake: 1000,
  rewardAvailable: 500,
  rewardWithdrawn: 200,
  rewardPools: ["pool1", "pool2"],
  pool: {
    tickerName: "POOL",
    poolName: "Example Pool",
    poolId: "poolId123",
    iconUrl: "iconUrl123",
    logoUrl: "logoUrl123"
  }
};
jest.mock("src/commons/hooks/useFetch");

describe("DetailViewStakeKey component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData
    });
  });

  it("should component render", () => {
    const onClose = jest.fn();
    render(<DetailViewStakeKey handleClose={onClose} stakeId={mockStake} open={true} />);
    expect(screen.getByRole("heading", { name: /withdrawal history/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /instantaneous rewards/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(mockStake, "i") })).toBeInTheDocument();
  });

  it("should view more button was clicked", () => {
    const history = createMemoryHistory();
    const onClose = jest.fn();
    render(
      <Router history={history}>
        <DetailViewStakeKey handleClose={onClose} stakeId={mockStake} open={true} />
      </Router>
    );
    const viewDetail = screen.getAllByRole("link", { name: /view details/i });

    act(() => {
      userEvent.click(viewDetail[0]);
    });

    expect(history.location.pathname).toBe(details.stake(mockStake));
  });
});
