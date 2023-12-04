import { render, screen } from "src/test-utils";
import { formatADAFull, formatDateTimeLocal } from "src/commons/utils/helper";

import BlockOverview from ".";

const mockData = {
  data: {
    hash: "bc9531f3c2d7554860f4bc80b15c6bfa772f83853c2a41cea05fa524d9b20221",
    time: "2023/09/22 21:35:05",
    txCount: 12,
    epochNo: 437,
    blockNo: 9323931,
    slotNo: 103852214,
    epochSlotNo: 431414,
    totalFees: 4604226,
    totalOutput: 1226900549277,
    slotLeader: "5ed675dd3d0640ca94bf8c3d6a5bfaac0f59930c99a94ffe3686cb70",
    confirmation: 305349
  } as BlockDetail,
  loading: false,
  lastUpdated: 1701674917773
};

describe("Block Overview Test", () => {
  beforeEach(() => {
    render(<BlockOverview {...mockData} />);
  });

  it("should component render", () => {
    expect(screen.getByText(formatDateTimeLocal("2023/09/22 21:35:05"))).toBeInTheDocument();
    expect(screen.getByText("305349")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText(formatADAFull("4604226"))).toBeInTheDocument();
    expect(screen.getByText(formatADAFull("1226900549277"))).toBeInTheDocument();
    expect(screen.getByText("9323931")).toBeInTheDocument();
    expect(screen.getByText("431414 - 103852214")).toBeInTheDocument();
  });
});
