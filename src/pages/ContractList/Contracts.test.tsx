import { screen, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render } from "src/test-utils";
import Table from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";

import Transactions from ".";

const mockData = {
  data: [
    {
      address:
        "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha",
      balance: 60714355376722,
      txCount: 1349643
    }
  ]
};

jest.mock("src/commons/hooks/useFetchList");

describe("Contracts list view", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Contracts list page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<Transactions />);
    expect(useFetchList).toBeCalled();
  });

  it("should show correct data in table", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    render(<Transactions />);
    expect(screen.getByText("addr1...xmsha")).toBeInTheDocument();
    expect(screen.getByText("Smart Contracts")).toBeInTheDocument();
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
        <Transactions />
      </Router>
    );

    const ContractItem = screen.getByText("addr1...xmsha");
    fireEvent.click(ContractItem);
    expect(history.location.pathname).toBe(
      "/contracts/addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha/transaction"
    );
  });
});
