import { cleanup } from "@testing-library/react";
import { useSelector } from "react-redux";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

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

const mockBTCMarket: CardanoMarket[] = [
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    current_price: 0.00000959,
    market_cap: 337775,
    market_cap_rank: 9,
    fully_diluted_valuation: 431244,
    total_volume: 13019,
    high_24h: 0.00001012,
    low_24h: 0.00000953,
    price_change_24h: -5.28597946137e-7,
    price_change_percentage_24h: -5.22366,
    market_cap_change_24h: "-19210.070303235785",
    market_cap_change_percentage_24h: -5.3812,
    circulating_supply: 35246552423.2316,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 0.00007382,
    ath_change_percentage: -87.01957,
    ath_date: "2018-01-04T00:00:00.000Z",
    atl: 0.00000295,
    atl_change_percentage: 224.81086,
    atl_date: "2017-11-04T00:00:00.000Z",
    roi: null,
    last_updated: "2024-03-19T06:14:40.882Z"
  }
];

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

const mockUSDMarket: CardanoMarket[] = [
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    current_price: 0.627226,
    market_cap: 21996709634,
    market_cap_rank: 9,
    fully_diluted_valuation: 28083652598,
    total_volume: 851419893,
    high_24h: 0.694149,
    low_24h: 0.621373,
    price_change_24h: -0.06692287406879649,
    price_change_percentage_24h: -9.641,
    market_cap_change_24h: "-2491949482.1618385",
    market_cap_change_percentage_24h: -10.17593,
    circulating_supply: 35246552423.2316,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -79.79001,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 3140.39224,
    atl_date: "2020-03-13T02:22:55.044Z",
    roi: null,
    last_updated: "2024-03-19T06:14:40.882Z"
  }
];

describe("HomeStatistic", () => {
  beforeEach(() => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockUseSelector = useSelector as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockStakeAnalytis });

    // jest.mock("src/commons/hooks/useFetchInterval", () => ({
    //   useFetchInterval: jest.fn((url) => {
    //     if (url.includes("btc")) {
    //       return {
    //         data: mockBTCMarket,
    //         lastUpdated: "2024-03-19T00:00:00Z"
    //       };
    //     } else if (url.includes("usd")) {
    //       return {
    //         data: mockUSDMarket,
    //         lastUpdated: "2024-03-19T00:00:00Z"
    //       };
    //     }
    //   })
    // }));

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

    // expect(screen.getByTestId("ada-price-box-title")).toBeInTheDocument();
    // expect(screen.getByTestId("ada-current-price")).toContain(`$${mockUSDMarket[0].current_price}`);
    // expect(screen.getByText("-1,59 %")).toBeInTheDocument();
    // expect(screen.getByTestId("ada-price-in-btc")).toContain(`${mockBTCMarket[0].current_price} BTC`);
  });

  // it("renders Market cap", async () => {
  //   render(<HomeStatistic />);
  //   await new Promise((r) => setTimeout(r, 500));

  //   expect(screen.getByTestId("market-cap-box-title")).toBeInTheDocument();
  // });

  // it("renders Live Stake", async () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <Router history={history}>
  //       <HomeStatistic />
  //     </Router>
  //   );
  //   await new Promise((r) => setTimeout(r, 500));

  //   expect(screen.getByTestId("live-stake-box-title")).toBeInTheDocument();
  //   expect(screen.getByTestId("live-stake-value")).toHaveTextContent("22.81B");
  //   expect(screen.getByTestId("live-stake-progress-active")).toHaveTextContent("67%");
  //   expect(screen.getByTestId("active-stake-value")).toHaveTextContent("22.75B");
  //   expect(screen.getByTestId("circulating-supply-value")).toHaveTextContent("33.99B");
  // });
});
