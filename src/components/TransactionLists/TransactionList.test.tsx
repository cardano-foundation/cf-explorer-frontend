import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatADAFull } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import TransactionList from ".";

const mockProps = {
  underline: true,
  url: "https://example.com/transactions",
  openDetail: jest.fn(),
  selected: "transaction-hash",
  showTabView: true,
  handleClose: jest.fn()
};

const mockData = {
  hash: "transaction-hash",
  blockNo: 123,
  blockHash: "block-hash",
  epochNo: 456,
  epochSlotNo: 789,
  slot: 987,
  addressesInput: ["input-address-1", "input-address-2"],
  addressesOutput: ["output-address-1", "output-address-2"],
  fee: 100,
  totalOutput: 1000,
  time: "2022-01-01 12:00:00",
  balance: 500,
  tokens: []
};

jest.mock("src/commons/hooks/useFetchList");

describe("TransactionList component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1 });
  });
  it("should component render", () => {
    render(<TransactionList {...mockProps} />);
    expect(screen.getByRole("columnheader", { name: /tx hash/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /block/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.hash })).toBeInTheDocument();
    expect(screen.getByText(formatADAFull(mockData.fee))).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <TransactionList {...mockProps} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.hash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.hash));
  });
});
