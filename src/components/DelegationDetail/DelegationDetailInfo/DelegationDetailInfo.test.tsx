import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import DelegationDetailInfo, { IDelegationDetailInfo } from ".";

const mockProps: IDelegationDetailInfo = {
  data: {
    poolName: "Sample Pool",
    tickerName: "TICKER",
    poolView: "pool1abc",
    createDate: "2022-01-01",
    rewardAccounts: ["rewardAccount1", "rewardAccount2"],
    ownerAccounts: ["ownerAccount1", "ownerAccount2"],
    poolSize: 1000000,
    stakeLimit: 500000,
    delegators: 100,
    saturation: 0.8,
    reward: 5000,
    ros: 5,
    pledge: 100000,
    cost: 1000,
    margin: 0.03,
    epochBlock: 1000,
    lifetimeBlock: 5000
  },
  loading: false,
  poolId: "poolId123"
};

describe("DelegationDetailInfo component", () => {
  it("should component render", () => {
    render(<DelegationDetailInfo {...mockProps} />);
    expect(screen.getByRole("heading", { name: /sample pool/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /please sign in to save your bookmark/i })).toBeInTheDocument();
    expect(screen.getByText(mockProps.poolId)).toBeInTheDocument();
  });
  it("should commponent redirect to detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DelegationDetailInfo {...mockProps} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /owneraccount1/i }));
    expect(history.location.pathname).toBe(details.stake(mockProps.data?.ownerAccounts[0]));
  });
});
