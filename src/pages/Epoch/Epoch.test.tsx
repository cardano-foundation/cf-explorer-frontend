import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import Epoch from "./index";

jest.mock("src/commons/hooks/useFetchList");
const mockData = [
  {
    blkCount: 20947,
    endTime: "2023/06/14 21:44:28",
    maxSlot: 432000,
    no: 417,
    outSum: 229341415829835740,
    rewardsDistributed: null,
    startTime: "2023/06/09 21:47:26",
    status: "REWARDING",
    txCount: 375738,
    account: 100
  }
];

const mockDataLatestEpoch = [
  {
    blkCount: 1973,
    endTime: "2023/06/19 21:44:54",
    maxSlot: 432000,
    no: 418,
    outSum: 22150782023247476,
    rewardsDistributed: null,
    startTime: "2023/06/14 21:44:54",
    status: "IN_PROGRESS",
    txCount: 37219,
    account: 100
  }
];

describe("Epoch component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockedUseFetchList = useFetchList as jest.Mock;

    mockedUseFetchList.mockReturnValue({
      data: mockData,
      currentPage: 0,
      total: mockData.length,
      update: jest.fn()
    });

    mockedUseFetchList.mockReturnValue({
      data: mockDataLatestEpoch,
      currentPage: 0,
      total: mockDataLatestEpoch.length,
      update: jest.fn()
    });
  });

  it("should latest epoch component render on PC", async () => {
    render(<Epoch />);
    expect(screen.getByText(formatDateTimeLocal(mockDataLatestEpoch[0].startTime))).toBeInTheDocument();
    expect(screen.getByText(mockDataLatestEpoch[0].blkCount)).toBeInTheDocument();
  });

  it("should epoch table render on PC", () => {
    render(<Epoch />);
    const result = screen.getByText(/result/i);

    expect(result.innerHTML.includes("1")).toBeTruthy();
  });

  it("should epoch table got errors or empty", () => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValueOnce({
      data: [],
      currentPage: 0,
      total: 0,
      update: jest.fn(),
      error: true
    });
    mockedUseFetchList.mockReturnValueOnce({
      data: [],
      currentPage: 0,
      total: 0,
      update: jest.fn(),
      error: true
    });

    render(<Epoch />);
    expect(screen.getByAltText("empty icon")).toBeInTheDocument();
  });
});
