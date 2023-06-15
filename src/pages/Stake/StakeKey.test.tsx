import { screen, cleanup, fireEvent } from "@testing-library/react";
import { render } from "src/test-utils";
import Table from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import Stake from ".";

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

describe("Stake key view", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render stake key page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<Stake />);
    expect(useFetchList).toBeCalled();
    expect(screen.getByText("Registration")).toBeInTheDocument();
    expect(screen.getByText("Deregistration")).toBeInTheDocument();
  });

  it("renders the table with given column and data", () => {
    const columns = [
      {
        title: "Test Column",
        key: "test",
        render: (r: any) => <div>{r.test}</div>
      }
    ];

    const data = [
      {
        test: "Test Data"
      }
    ];
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("Test Column")).toBeInTheDocument();
    expect(screen.getByText("Test Data")).toBeInTheDocument();
  });

  it("should navigate to the correct route when button is clicked", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Stake />
      </Router>
    );

    const TxHashStakeItem = screen.getByText("10efa612b6...72c9feb");
    fireEvent.click(TxHashStakeItem);
    expect(history.location.pathname).toBe(
      "/transaction/10efa612b61bd83e0502c76cfa56c4987bcf0a8a1544b8b57068daf9272c9feb/summary"
    );

    const BlockItem = screen.getByText(8897915);
    fireEvent.click(BlockItem);
    expect(history.location.pathname).toBe(
      "/block/8897915"
    );

    const StakeKeyItem = screen.getByText("stake...dayvd")
    fireEvent.click(StakeKeyItem);
    expect(history.location.pathname).toBe(
      "/stake/stake1uy56htr6qegvdj639sjgvmht8gymq8yx96mvgz9qslzucwqtdayvd/delegation"
    );
  });
});
