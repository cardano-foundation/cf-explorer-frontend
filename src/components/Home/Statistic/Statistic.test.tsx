import { cleanup, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { numberWithCommas } from "src/commons/utils/helper";

import HomeStatistic from ".";

jest.mock("src/commons/hooks/useFetch");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

const mockStakeAnalytis: StakeAnalytics = {
  activeStake: 22759595184076732,
  liveStake: 22812603248193964
};

const mockBTCMarket: CardanoMarket = {
  current_price: 0.00001382,
  market_cap: 484265,
  price_change_24h: 1.02298e-7,
  price_change_percentage_24h: 0.74592,
  circulating_supply: 35045020830.3234,
  total_supply: 45000000000,
  last_updated: "2023-05-31T07:02:46.115Z"
};

const mockCurrentEpoch: EpochCurrentType = {
  no: 416,
  slot: 281663,
  totalSlot: 432000,
  account: 96433,
  startTime: "2023-01-31T07:02:46.115Z",
  endTime: "2023-05-31T07:02:46.115Z",
  circulatingSupply: 33999888463776064,
  blkCount: 0
};

const mockUSDMarket: CardanoMarket = {
  current_price: 0.37529,
  market_cap: 13153603581,
  price_change_24h: -0.006,
  price_change_percentage_24h: -1.59026,
  circulating_supply: 35045020830.3234,
  total_supply: 45000000000,
  last_updated: "2023-05-31T07:02:35.473Z"
};

describe("HomeStatistic", () => {
  beforeEach(() => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockUseSelector = useSelector as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockStakeAnalytis });
    mockUseSelector.mockReturnValue({
      currentEpoch: mockCurrentEpoch,
      usdMarket: mockUSDMarket,
      btcMarket: mockBTCMarket
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("renders Ada Price", async () => {
    render(<HomeStatistic />);
    expect(screen.getByTestId("ada-price-box-title")).toBeInTheDocument();
    expect(screen.getByTestId("ada-current-price")).toHaveTextContent(`$${mockUSDMarket.current_price}`);
    expect(screen.getByText("-1,59 %")).toBeInTheDocument();
    expect(screen.getByTestId("ada-price-in-btc")).toHaveTextContent(`${mockBTCMarket.current_price} BTC`);
  });

  it("renders Market cap", async () => {
    render(<HomeStatistic />);
    expect(screen.getByTestId("market-cap-box-title")).toBeInTheDocument();
    expect(screen.getByTestId("market-cap-value")).toHaveTextContent(`$${numberWithCommas(mockUSDMarket.market_cap)}`);
    expect(screen.getByTestId("last-update-market-cap")).toHaveTextContent(
      `Last updated ${moment(mockUSDMarket.last_updated + "Z").fromNow()}`
    );
  });

  it("renders Live Stake", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <HomeStatistic />
      </Router>
    );
    expect(screen.getByTestId("live-stake-box-title")).toBeInTheDocument();
    expect(screen.getByTestId("live-stake-value")).toHaveTextContent("22.81B");
    expect(screen.getByTestId("live-stake-progress-active")).toHaveTextContent("67%");
    expect(screen.getByTestId("active-stake-value")).toHaveTextContent("22.75B");
    expect(screen.getByTestId("circulating-supply-value")).toHaveTextContent("33.99B");
    expect(screen.getByTestId("circulating-supply-percentage")).toHaveTextContent("(75%)");
  });
});
