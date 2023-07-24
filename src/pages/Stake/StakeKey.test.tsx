import { screen, cleanup, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import { render } from "src/test-utils";
import { details } from "src/commons/routers";
import useFetchList from "src/commons/hooks/useFetchList";

import Stake, { STAKE_ADDRESS_TYPE } from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

const mockData = {
  data: [
    {
      stakeKey: "stake1uy56htr6qegvdj639sjgvmht8gymq8yx96mvgz9qslzucwqtdayvd",
      txHash: "10efa612b61bd83e0502c76cfa56c4987bcf0a8a1544b8b57068daf9272c9feb",
      block: 8897915,
      txTime: "2023/06/13 03:53:59"
    }
  ]
};

jest.mock("src/commons/hooks/useFetchList");

describe("Stake adress view", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render stake adress registration page", () => {
    const mockUseFetch = useFetchList as jest.Mock;
    mockUseFetch.mockReturnValue({ data: [] });
    render(<Stake stakeAddressType={STAKE_ADDRESS_TYPE.REGISTRATION} />);
    expect(useFetchList).toBeCalled();
    expect(screen.getByText("Stake Address Registration")).toBeInTheDocument();
  });

  it("should render stake address de-registration page", () => {
    const mockUseFetch = useFetchList as jest.Mock;
    mockUseFetch.mockReturnValue({ data: [] });
    render(<Stake stakeAddressType={STAKE_ADDRESS_TYPE.DEREREGISTRATION} />);
    expect(useFetchList).toBeCalled();
    expect(screen.getByText("Stake Address Deregistration")).toBeInTheDocument();
  });

  it("should navigate to the correct route when txHash item is clicked", () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Stake stakeAddressType={STAKE_ADDRESS_TYPE.REGISTRATION} />
      </Router>
    );

    const TxHashStakeItem = screen.getByText("10efa612b6...72c9feb");
    fireEvent.click(TxHashStakeItem);
    expect(history.location.pathname).toBe(details.transaction(mockData.data[0].txHash));
  });
  it("should navigate to the correct route when block item is clicked", () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Stake stakeAddressType={STAKE_ADDRESS_TYPE.REGISTRATION} />
      </Router>
    );

    const BlockItem = screen.getByText(8897915);
    fireEvent.click(BlockItem);
    expect(history.location.pathname).toBe(details.block(mockData.data[0].block.toString()));
  });
  it("should navigate to the correct route when stake address item is clicked", () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Stake stakeAddressType={STAKE_ADDRESS_TYPE.REGISTRATION} />
      </Router>
    );

    const StakeKeyItem = screen.getByText("stake...dayvd");
    fireEvent.click(StakeKeyItem);
    expect(history.location.pathname).toBe(details.stake(mockData.data[0].stakeKey));
  });
});
