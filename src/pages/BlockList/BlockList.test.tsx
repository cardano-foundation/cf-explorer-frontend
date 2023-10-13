import { screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

import { render } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";

import BlockList from ".";

const mockData = {
  data: [
    {
      hash: "b81ec04744951a5eefa56ca3b60cceed2063178683ede31dadbed20f583ebc4a",
      blockNo: 8905376,
      epochNo: 418
    }
  ]
};

jest.mock("src/commons/hooks/useFetchList");

describe("Blocks view", () => {
  beforeEach(() => {
    const mockUseFetch = useFetchList as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData.data, initialized: true });
  });

  afterEach(() => {
    cleanup();
  });

  it("should render Blocks page", async () => {
    const mockUseFetch = useFetchList as jest.Mock;
    await mockUseFetch.mockReturnValue({ data: [] });
    render(<BlockList />);
    expect(useFetchList).toBeCalled();
  });

  it("should navigate to the correct route when block ID item is clicked", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <BlockList />
      </Router>
    );

    const BlocksIDItem = screen.getByText(/b81ec/);
    fireEvent.click(BlocksIDItem);
    await waitFor(() => {
      expect(history.location.pathname).toBe(details.block(mockData.data[0].blockNo.toString()));
    });
  });

  it("should navigate to the correct route when block No item is clicked", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <BlockList />
      </Router>
    );

    const BlocksNoItem = screen.getByText(8905376);
    fireEvent.click(BlocksNoItem);
    await waitFor(() => {
      expect(history.location.pathname).toBe(details.block(mockData.data[0].blockNo.toString()));
    });
  });

  it("should navigate to the correct route when epoch item is clicked", async () => {
    const mockUseFetchList = useFetchList as jest.Mock;
    mockUseFetchList.mockReturnValue(mockData);
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <BlockList />
      </Router>
    );

    const EpochItem = screen.getByText(418);
    fireEvent.click(EpochItem);
    await waitFor(() => {
      expect(history.location.pathname).toBe(details.epoch(mockData.data[0].epochNo.toString()));
    });
  });
});
