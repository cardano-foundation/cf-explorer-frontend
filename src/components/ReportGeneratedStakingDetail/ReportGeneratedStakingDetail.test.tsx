import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import ReportGeneratedStakingDetailTabs from ".";

const mockData: IReportStaking = {
  eventDelegation: true,
  eventDeregistration: false,
  eventRegistration: true,
  eventRewards: true,
  eventWithdrawal: false,
  id: 12345,
  stakeKey: "abcdef123456",
  createdAt: "2023/07/13 22:00:00",
  username: "mocked_user",
  reportName: "Mocked Report",
  fromDate: "2023/06/01 00:00:00",
  toDate: "2023/06/30 23:59:59",
  isADATransfer: false,
  isFeesPaid: true,
  status: "GENERATED"
};
jest.mock("src/commons/hooks/useFetch");
describe("ReportGeneratedStakingDetail component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({ data: mockData });
  });

  it("should component render", () => {
    render(<ReportGeneratedStakingDetailTabs />);
    expect(screen.getByRole("tab", { name: /registrationicon\.svg stake key registration/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /delegationicon\.svg delegation history/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /rewardsdistributionicon\.svg rewards distribution/i })).toBeInTheDocument();
  });

  it("should component change tab", () => {
    render(<ReportGeneratedStakingDetailTabs />);
    const tab = screen.getByRole("tab", { name: /delegationicon\.svg delegation history/i });
    fireEvent.click(tab);
    const active = screen.getByText(/delegation history/i).getAttribute("active");
    expect(active).toBe("1");
  });
});
