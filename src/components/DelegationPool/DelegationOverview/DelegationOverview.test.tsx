import moment from "moment";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import OverViews from ".";

const mockData: OverViewDelegation = {
  countDownEndTime: 1626088800,
  delegators: 1000,
  epochNo: 50,
  epochSlotNo: 500,
  liveStake: 1000000,
  activePools: 200,
  retiredPools: 50
};

jest.mock("src/commons/hooks/useFetch");

describe("DelegationOverview component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      lastUpdated: moment(new Date()).format("DD/MM/YYYY")
    });
  });
  it("should component render", () => {
    render(<OverViews />);
    expect(screen.getByRole("heading", { name: /stake pools/i })).toBeInTheDocument();
    expect(screen.getByText(/delegators/i)).toBeInTheDocument();
    expect(screen.getByText(/active pools/i)).toBeInTheDocument();
  });

  it("should app go to detail page ", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <OverViews />
      </Router>
    );

    fireEvent.click(screen.getByRole("link", { name: /50/i }));
    expect(history.location.pathname).toBe(details.epoch(mockData.epochNo));
  });
});
