import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";

import StakeDelegations from ".";

const mockData = {
  blockNo: 12345,
  epochNo: 42,
  epochSlotNo: 987,
  pools: ["pool_id_1", "pool_id_2"],
  stakeKeys: ["stake_key_1", "stake_key_2"],
  time: "2023/07/20 12:34:56",
  txHash: "0x0123456789abcdef"
};

jest.mock("src/commons/hooks/useFetchList");
describe("StakeDelegations page", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockImplementation(() => {
      return {
        data: [mockData],
        total: 1
      };
    });
  });

  it("should component render", () => {
    render(<StakeDelegations />);
    expect(screen.getByRole("heading", { name: "Stake Delegation(s)" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.stakeKeys[0] })).toBeInTheDocument();
  });

  it("should user goto transaction detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <StakeDelegations />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.txHash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.txHash));
  });
});
