import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";
import { IPoolReportList } from "src/types/report";

import DeregsitrationTab from "./DeregsitrationTab";
import PoolRegistrationTab from "./PoolRegistrationTab";
import PoolSizeTab from "./PoolSizeTab";
import ProtocolUpdateTab from "./ProtocolUpdateTab";
import RewardsDistributionTab from "./RewardsDistributionTab";

jest.mock("src/commons/hooks/useFetchList");
jest.mock("src/commons/hooks/useFetch");

describe("DeregsitrationTab component", () => {
  const mockData: SPODeregistration = {
    poolId: "abcdef123456789",
    poolName: "Mocked Pool",
    poolView: "https://mockedpool.com",
    stakeKeys: ["abcdef123456", "789abcdef123"],
    txHash: "0x123456789abcdef",
    totalFee: 20,
    poolHold: 5000,
    time: "2023/07/13 20:00:00",
    fee: 10,
    retiringEpoch: 2345
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });

  it("should component render", () => {
    render(<DeregsitrationTab />);
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /transaction hash/i }));
    expect(screen.getByRole("button", { name: /eye\.svg/i, hidden: true })).toBeInTheDocument();
  });

  it("should DeregistrationCertificateModal open", () => {
    render(<DeregsitrationTab />);
    fireEvent.click(screen.getByRole("button", { name: /eye\.svg/i }));
    expect(screen.getByText(/deregistration certificate/i)).toBeInTheDocument();
    expect(screen.getByText(/retirement in epoch/i)).toBeInTheDocument();
  });
});

describe("PoolRegistrationTab component", () => {
  const mockData: SPORegistrationTabpular = {
    poolUpdateId: 1234,
    txHash: "0xabcdef123456789",
    totalFee: 50,
    time: "2023/07/14 10:30:00",
    fee: 10,
    stakeKeys: ["abcdef123456", "789abcdef123"],
    deposit: 5000
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
    (useFetch as jest.Mock).mockReturnValue({ data: { stakeKeys: ["stake123ac"] } });
  });

  it("should component render", () => {
    render(<PoolRegistrationTab />);
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: formatDateTimeLocal(mockData.time) })).toBeInTheDocument();
  });

  it("should RegistrationCertificateModal open", () => {
    render(<PoolRegistrationTab />);
    fireEvent.click(screen.getByRole("button", { name: /eye\.svg/i }));
    expect(screen.getByText(/pool registration certificate/i)).toBeInTheDocument();
    expect(screen.getByText(/transaction id/i)).toBeInTheDocument();
    expect(screen.getByText(/pool id/i)).toBeInTheDocument();
  });
});

describe("PoolSizeTab", () => {
  const mockDetailData: IPoolReportList = {
    reportName: "Mocked Report",
    epochRanges: [1234, 5678],
    toDate: "2023/07/31 23:59:59",
    isPoolSize: true,
    isFeesPaid: false,
    event: "REWARD",
    reportId: 12345,
    eventDeregistration: false,
    eventPoolUpdate: true,
    eventRegistration: true,
    eventReward: true,
    poolView: "https://mockedpool.com",
    createdAt: "2023/07/14 11:00:00",
    status: "GENERATED",
    reportHistory: {
      id: 67890,
      storageKey: "mocked_key",
      reportName: "Mocked Report",
      username: "mocked_user",
      createdAt: "2023/07/14 11:30:00",
      status: "SUCCESS",
      type: "PDF"
    }
  };

  const mockData = { size: 123, fees: 1000, epoch: 333 };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
    (useFetch as jest.Mock).mockReturnValue({ data: mockDetailData });
  });

  it("should component render", () => {
    render(<PoolSizeTab />);
    expect(screen.getByRole("link", { name: mockData.epoch.toString() })).toBeInTheDocument();
    expect(screen.getByText(formatADAFull(mockData.size))).toBeInTheDocument();
    expect(screen.getByTestId("poolsize-ada-icon")).toBeInTheDocument();
  });

  it("should component goto epoch page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <PoolSizeTab />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.epoch.toString() }));
    expect(history.location.pathname).toBe(details.epoch(mockData.epoch));
  });
});
describe("ProtocolUpdateTab component", () => {
  const mockData: PoolUpdateDetail = {
    poolUpdateId: 1234,
    poolId: "abcdef123456",
    poolName: "Mocked Pool",
    poolView: "https://mockedpool.com",
    previousPledge: 5000,
    previousMargin: 0.03,
    txHash: "0xabcdef123456789",
    time: "2023/07/14 12:00:00",
    stakeKeys: ["abcdef123456", "789abcdef123"],
    fee: 10,
    rewardAccount: "mocked_reward_account",
    vrfKey: "mocked_vrf_key",
    pledge: 10000,
    margin: 0.05,
    cost: 340
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });

  it("should component render", () => {
    render(<ProtocolUpdateTab />);
    expect(screen.getByRole("link", { name: mockData.txHash })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: formatDateTimeLocal(mockData.time) })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /eye\.svg/i })).toBeInTheDocument();
  });

  it("should PoolUpdateModal open ", () => {
    render(<ProtocolUpdateTab />);
    fireEvent.click(screen.getByText(/eye\.svg/i));
    expect(screen.getByText(/transaction id/i)).toBeInTheDocument();
    expect(screen.getByText(/reward account/i)).toBeInTheDocument();
  });
});

describe("RewardsDistributionTab component", () => {
  const mockData: SPO_REWARD = {
    epochNo: 333,
    time: "2023/07/14 13:00:00",
    amount: 1000,
    rewardAccount: "mocked_reward_account"
  };

  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData], total: 1, totalPage: 1, loading: false });
  });

  it("should component render", () => {
    render(<RewardsDistributionTab />);
    expect(screen.getByRole("cell", { name: mockData.epochNo.toString() })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: formatDateTimeLocal(mockData.time) }));
    expect(screen.getByRole("link", { name: mockData.rewardAccount })).toBeInTheDocument();
  });

  it("should component go to detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <RewardsDistributionTab />
      </Router>
    );
    expect(screen.getByRole("link", { name: mockData.epochNo.toString() })).toBeInTheDocument();
    expect(history.location.pathname).toBe(details.epoch(mockData.epochNo));
  });
});
