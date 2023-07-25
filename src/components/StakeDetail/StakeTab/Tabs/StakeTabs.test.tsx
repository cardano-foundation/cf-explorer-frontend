import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTimeLocal } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import DelegationHistoryTab from "./DelegationHistoryTab";
import InstantaneousTab from "./InstantaneousTab";
import StakeHistoryTab from "./StakeHistoryTab";
import TransactionTab from "./TransactionTab";
import WithdrawalHistoryTab from "./WithdrawalHistoryTab";

jest.mock("src/commons/hooks/useFetchList");

describe("DelegationHistoryTab component", () => {
  const mockData = {
    time: "2023-07-11 12:34:56",
    epochNo: 50,
    blockNo: 1000,
    epochSlotNo: 500,
    txHash: "0x123456789abcdef",
    poolId: "pool-123",
    poolData: "Sample Pool Data"
  };
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockData]
    });
  });

  it("should component render", () => {
    render(<DelegationHistoryTab />);
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.blockNo.toString() })).toBeInTheDocument();
  });

  it("should the button goto detail page click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DelegationHistoryTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.txHash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.txHash));
  });
});

describe("InstantaneousTab comopnent", () => {
  const mockData = {
    time: "2023-07-11 12:34:56",
    epochNo: 50,
    blockNo: 1000,
    amount: "1000 ADA",
    epochSlotNo: 500,
    txHash: "0x123456789abcdef"
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockData]
    });
  });

  it("should component render", () => {
    render(<InstantaneousTab />);
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.epochNo.toString() })).toBeInTheDocument();
  });

  it("should the button goto detail page click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <InstantaneousTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.txHash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.txHash));
  });
});

describe("StakeHistoryTab component", () => {
  const mockData = {
    time: "07/11/2023 12:34:56",
    epochNo: 50,
    blockNo: 1000,
    epochSlotNo: 500,
    txHash: "0x123456789abcdef",
    action: "Registered"
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockData]
    });
  });

  it("should component render", () => {
    render(<StakeHistoryTab />);
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.epochNo.toString() })).toBeInTheDocument();
  });

  it("should the button goto detail page click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <InstantaneousTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.txHash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.txHash));
  });
});

describe("TransactionTab component", () => {
  const mockTransactionToken: TransactionToken = {
    address: "0x123456789abcdef",
    addressId: 1,
    displayName: "Token",
    fingerprint: "ABCDEF",
    name: "Token Name",
    policy: "Policy",
    quantity: 1000
  };

  const mockData: Transactions = {
    hash: "0x123456789abcdef",
    blockNo: 1000,
    blockHash: "0x987654321fedcba",
    epochNo: 50,
    epochSlotNo: 500,
    slot: 123,
    addressesInput: ["0xinput1", "0xinput2"],
    addressesOutput: ["0xoutput1", "0xoutput2"],
    fee: 10,
    totalOutput: 990,
    time: "07/11/2023 12:34:56",
    balance: 5000,
    tokens: [mockTransactionToken]
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockData]
    });
  });

  it("should component render", () => {
    render(<TransactionTab />);
    expect(screen.getByRole("link", { name: mockData.hash })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.blockNo.toString() })).toBeInTheDocument();
  });

  it("should the button goto detail page click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <TransactionTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.hash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.hash));
  });
});

describe("WithdrawalHistoryTab component", () => {
  const mockData = {
    time: "2023-07-11 12:34:56",
    epochNo: 50,
    blockNo: 1000,
    amount: "1000 ADA",
    epochSlotNo: 500,
    txHash: "0x123456789abcdef"
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockData]
    });
  });

  it("should component render", () => {
    render(<WithdrawalHistoryTab />);
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.blockNo.toString() })).toBeInTheDocument();
  });

  it("should the button goto detail page click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <WithdrawalHistoryTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.txHash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.txHash));
  });
});
