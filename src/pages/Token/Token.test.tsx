import { screen, cleanup, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render } from "src/test-utils";
import Table from "src/components/commons/Table";
import useFetchList from "src/commons/hooks/useFetchList";

import Tokens from ".";

const mockData = {
  data: [
    {
      createdOn: "2023/05/31 08:26:40",
      displayName: "HOSKY",
      fingerprint: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235",
      metadata: {
        decimals: 0,
        description: "The PREMIERE low-quality s**t coin doggo meme token",
        logo: "iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAIAAADCwUOzAAAFX",
        ticker: "HOSKY",
        url: "https://hosky.io"
      },
      name: "484f534b59",
      numberOfHolders: 94642,
      policy: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235",
      supply: "1000000000000001",
      totalVolume: "66173542937756593",
      txCount: 5712184,
      volumeIn24h: "127458451800380"
    }
  ]
};

jest.mock("src/commons/hooks/useFetchList");

describe("Token view", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render Tokens page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<Tokens />);
    expect(useFetchList).toBeCalled();
  });

  it("should show correct data in table", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    render(<Tokens />);
    expect(screen.getByText("Native Tokens")).toBeInTheDocument();
    expect(screen.getByText("HOSKY")).toBeInTheDocument();
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
        <Tokens />
      </Router>
    );

    const TokensItem = screen.getByText("HOSKY");
    fireEvent.click(TokensItem);
    expect(history.location.pathname).toBe(
      "/token/a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235/transactions"
    );
  });
});
