import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { details } from "src/commons/routers";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import DelegationTab from "./DelegationTab";
import DeregistrationTab from "./DeregistrationTab";
import RewardsDistributionTab from "./RewardsDistributionTab";
import StakingRegistrationTab from "./StakingRegistrationTab";
import WalletActitityTab from "./WalletActivityTab";
import WithdrawalHistoryTab from "./WithdrawalHistoryTab";

jest.mock("src/commons/hooks/useFetchList");
describe("DelegationTab component", () => {
  const mockData = {
    txHash: "0x123456789abcdef",
    outSum: 1000,
    fee: 10,
    time: "2023/07/12 13:30:00"
  };
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });
  it("should component render", () => {
    render(<DelegationTab />);
    expect(screen.getByRole("columnheader", { name: /transaction hash/i })).toBeInTheDocument();
    expect(screen.getByText(/Created At/i)).toBeInTheDocument();
    expect(screen.getByText(/showing 1 result/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
  });

  it("should component render", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DelegationTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.txHash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.txHash));
  });
});

describe("DeregistrationTab component", () => {
  const mockData: RegistrationItem = {
    txHash: "0x456789abcdef123",
    fee: 5,
    deposit: 100,
    time: "2023/07/13 10:00:00"
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });

  it("should component render", () => {
    render(<DeregistrationTab />);
    expect(screen.getByRole("link", { name: /0x456789abcdef123/i })).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
    expect(screen.getByText(/eye\.svg/i)).toBeInTheDocument();
  });

  it("should DeregistrationCertificateModal open", () => {
    render(<DeregistrationTab />);
    fireEvent.click(screen.getByText(/eye\.svg/i));
    expect(screen.getByText(/deregistration certificate/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("RewardsDistributionTab component", () => {
  const mockData: RewardDistributionItem = {
    epoch: 1234,
    time: "2023/07/13 12:00:00",
    amount: 1000,
    type: "MEMBER"
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });

  it("should component render", () => {
    render(<RewardsDistributionTab />);
    expect(screen.getByText(/showing 1 result/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.epoch.toString() })).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
  });

  it("should component goto epoch detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <RewardsDistributionTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.epoch.toString() }));
    expect(history.location.pathname).toBe(details.epoch(mockData.epoch));
  });
});
describe("StakingRegistrationTab component", () => {
  const mockData: RegistrationItem = {
    txHash: "0x789abcdef123456",
    fee: 10,
    deposit: 500,
    time: "2023/07/13 14:30:00"
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });

  it("should component render", () => {
    render(<StakingRegistrationTab />);
    expect(screen.getByRole("link", { name: mockData.txHash }));
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /eye\.svg/i })).toBeInTheDocument();
  });

  it("should RegistrationCertificateModal open", () => {
    render(<StakingRegistrationTab />);
    fireEvent.click(screen.getByRole("button", { name: /eye\.svg/i }));
    expect(screen.getByText(/registration certificate/i)).toBeInTheDocument();
  });

  it("should component goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <StakingRegistrationTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.txHash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.txHash));
  });
});

describe("WalletActivityTab", () => {
  const mockData: WalletActivityIF = {
    txHash: "0xabcdef123456789",
    amount: 100,
    fee: 5,
    time: "2023/07/13 16:00:00",
    type: "RECEIVED",
    status: "SUCCESS"
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });

  it("should component render", () => {
    render(<WalletActitityTab />);
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
    expect(screen.getByText(mockData.status)).toBeInTheDocument();
  });

  it("should component goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <WalletActitityTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.txHash }));
    expect(history.location.pathname).toBe(details.transaction(mockData.txHash));
  });
});

describe("WithdrawalHistoryTab component", () => {
  const mockData: WithdrawalHistoryItem = {
    amount: 500,
    blockNo: 123456,
    epochNo: 1234,
    epochSlotNo: 5678,
    fee: 10,
    time: "2023/07/13 18:30:00Z",
    txHash: "0x123456789abcdef",
    txId: 123456789
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });

  it("should component render", () => {
    render(<WithdrawalHistoryTab />);
    expect(screen.getByText(/showing 1 result/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.txHash }));
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
  });

  it("should component goto detail page", () => {
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
