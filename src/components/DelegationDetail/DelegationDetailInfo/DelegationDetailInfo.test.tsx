import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";
import { POOL_STATUS } from "src/commons/utils/constants";

import DelegationDetailInfo, { IDelegationDetailInfo } from ".";

const mockProps: IDelegationDetailInfo = {
  data: {
    poolName: "Sample Pool",
    poolStatus: POOL_STATUS.ACTIVE,
    tickerName: "TICKER",
    poolView: "pool1abc",
    hashView: "153806dbcd134ddee69a8c5204e38ac80448f62342f8c23cfe4b7edf",
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
    totalBalanceOfPoolOwners: 1000000,
    epochBlock: 1000,
    lifetimeBlock: 5000,
    homepage: "https://octaluso.dyndns.org"
  },
  loading: false,
  poolId: "#poolId123"
};

describe("DelegationDetailInfo component", () => {
  it("should component render", () => {
    render(<DelegationDetailInfo {...mockProps} />);
    expect(screen.getByRole("heading", { name: /sample pool/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /please sign in to save your bookmark/i })).toBeInTheDocument();
    expect(screen.getByText("ACTIVE")).toBeInTheDocument();
    expect(screen.getByText("pool1abc")).toBeInTheDocument();
  });

  describe("should commponent redirect to detail page", () => {
    const history = createBrowserHistory();
    beforeEach(() => {
      render(
        <Router history={history}>
          <DelegationDetailInfo {...mockProps} />
        </Router>
      );
    });
    it("should component redirect to pool id", () => {
      fireEvent.click(screen.getByRole("link", { name: /pool1abc/i }));
      expect(history.location.pathname).toBe(details.delegation(mockProps.data?.poolView));
    });

    it("should component redirect to pool hash", () => {
      fireEvent.click(screen.getByRole("link", { name: /153806dbcd134ddee69a8c5204e38ac80448f62342f8c23cfe4b7edf/i }));
      expect(history.location.pathname).toBe(details.delegation(mockProps.data?.hashView));
    });

    it("should component open link homepage", () => {
      const link = screen.getByRole("link", { name: "https://octaluso.dyndns.org" });
      fireEvent.click(link);
      expect(link.getAttribute("target")).toBe("_blank");
    });

    it("should component redirect to owner account", () => {
      fireEvent.click(screen.getByRole("link", { name: /owneraccount1/i }));
      expect(history.location.pathname).toBe(details.stake(mockProps.data?.ownerAccounts[0]));
    });

    it("should component redirect to reward account", () => {
      fireEvent.click(screen.getByRole("link", { name: /rewardAccount1/i }));
      expect(history.location.pathname).toBe(details.stake(mockProps.data?.rewardAccounts[0]));
    });
  });
});
