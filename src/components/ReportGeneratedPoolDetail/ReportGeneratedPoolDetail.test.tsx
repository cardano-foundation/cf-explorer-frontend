import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import ReportGeneratedPoolDetailTabs from ".";

const mockData: IPoolReportList = {
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

jest.mock("src/commons/hooks/useFetch");
jest.mock("../TabularView/StakeTab");
describe("ReportGeneratedPoolDetail component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockImplementation((url: string, params: any) => {
      console.log(url, params);
      return { data: mockData };
    });
  });
  it("should component render", () => {
    render(<ReportGeneratedPoolDetailTabs />);
    expect(screen.getAllByText("Mocked Report").length).toBeGreaterThan(0);
  });
});
