import { cleanup, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";
import { details, routers } from "src/commons/routers";
import useFetch from "src/commons/hooks/useFetch";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";

import LatestTransactions from ".";

jest.mock("src/commons/hooks/useFetch");

const mockItem: CurrentTransactions = {
  blockNo: 8871993,
  fromAddress: [
    "addr1zxn9efv2f6w82hagxqtn62ju4m293tqvw0uhmdl64ch8uw6j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq6s3z70"
  ],
  toAddress: [
    "addr1q8djh575shm94au755ct4aj6zjhnvwvxcfl4vfe6wjd2g8vzmv0ez8xgftrhsev2rfvv0qz0ww86t5vlusphdhyd0vlsjeu6c4"
  ],
  amount: 4012095390078,
  hash: "030ad9f82ff24af08db1216504928506dac0650b1455c3ed4f32a1fb7d1fd64d",
  epochNo: 416,
  epochSlotNo: 192951,
  slot: 94541751,
  time: "2023/06/07 03:20:42",
  status: "SUCCESS"
};

describe("LatestTransactions", () => {
  beforeEach(() => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: [mockItem], initialized: true });
  });

  afterEach(() => {
    cleanup();
  });

  it("renders LatestTransactions", async () => {
    render(<LatestTransactions />);
    expect(screen.getByText("Latest Transactions")).toBeInTheDocument();
    const seeAllButton = screen.getByTestId("view-all-button");
    expect(seeAllButton).toBeInTheDocument();
    await userEvent.click(seeAllButton);
    expect(seeAllButton).toHaveAttribute("href", routers.TRANSACTION_LIST);
  });

  it("renders data in the table LatestTransactions", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LatestTransactions />
      </Router>
    );
    expect(screen.getByText(formatADAFull(mockItem.amount))).toBeInTheDocument();
    expect(screen.getByText(getShortHash(mockItem.hash))).toBeInTheDocument();
    expect(screen.getByText(mockItem.blockNo)).toBeInTheDocument();
    expect(screen.getByText(mockItem.epochNo)).toBeInTheDocument();
    expect(screen.getByText(mockItem.epochSlotNo)).toBeInTheDocument();
    expect(screen.getByText(getShortHash(mockItem.fromAddress[0]))).toBeInTheDocument();
    expect(screen.getByText(getShortHash(mockItem.toAddress[0]))).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(mockItem.time))).toBeInTheDocument();
  });

  it("test navigate item in LatestTransactions", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LatestTransactions />
      </Router>
    );
    const item = screen.getByText(/Transaction hash/i);
    await userEvent.click(item);
    await waitFor(async () => {
      expect(history.location.pathname).toBe(details.transaction(mockItem.hash));
    });
  });

  it("test navigate block in LatestTransactions", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LatestTransactions />
      </Router>
    );
    const item = screen.getByText(mockItem.blockNo);
    await userEvent.click(item);
    await waitFor(async () => {
      expect(history.location.pathname).toBe(details.block(mockItem.blockNo));
    });
  });

  it("test navigate epoch in LatestTransactions", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LatestTransactions />
      </Router>
    );
    const item = screen.getByText(mockItem.epochNo);
    await userEvent.click(item);
    await waitFor(async () => {
      expect(history.location.pathname).toBe(details.epoch(mockItem.epochNo));
    });
  });

  it("test navigate fromAddress in LatestTransactions", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LatestTransactions />
      </Router>
    );
    const item = screen.getByText(getShortHash(mockItem.fromAddress[0]));
    await userEvent.click(item);
    await waitFor(async () => {
      expect(history.location.pathname).toBe(details.address(mockItem.fromAddress[0]));
    });
  });

  it("test navigate toAddress in LatestTransactions", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LatestTransactions />
      </Router>
    );
    const item = screen.getByText(getShortHash(mockItem.toAddress[0]));
    await userEvent.click(item);
    await waitFor(async () => {
      expect(history.location.pathname).toBe(details.address(mockItem.toAddress[0]));
    });
  });
});
