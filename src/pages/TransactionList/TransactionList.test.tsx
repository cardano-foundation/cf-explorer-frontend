import { screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import { render } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";

import Transactions from ".";

const mockItem = {
  data: [
    {
      hash: "def63efac7a635c4cc6c65d1c7159a8c6411d68102e61f3f9967f4bb2de336b9",
      blockNo: 8902162,
      time: "2023/06/14 07:41:36",
      slot: 95162205
    }
  ]
};

jest.mock("src/commons/hooks/useFetchList");

describe("Transactions view", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render transactions page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<Transactions />);
    expect(useFetchList).toBeCalled();
  });

  it("should navigate to the correct route when hash item is clicked", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockItem);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Transactions />
      </Router>
    );

    const transactionsItem = screen.getByText("def63efac7...de336b9");
    fireEvent.click(transactionsItem);
    await waitFor(() => {
      expect(history.location.pathname).toBe(details.transaction(mockItem.data[0].hash));
    });
  });

  it("should navigate to the correct route when block item is clicked", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockItem);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Transactions />
      </Router>
    );

    const transactionsItem = screen.getByText(8902162);
    fireEvent.click(transactionsItem);
    await waitFor(() => {
      expect(history.location.pathname).toBe(details.block(mockItem.data[0].blockNo.toString()));
    });
  });
});
