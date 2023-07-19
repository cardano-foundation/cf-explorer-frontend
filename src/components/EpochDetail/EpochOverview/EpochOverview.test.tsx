import { render, screen } from "src/test-utils";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import EpochOverview from "./index";

const mockedData: IDataEpoch = {
  blkCount: 20947,
  endTime: "2023/06/14 21:44:28",
  maxSlot: 432000,
  no: 417,
  outSum: 229341415829835740,
  rewardsDistributed: 0,
  startTime: "2023/06/09 21:47:26",
  status: "REWARDING",
  txCount: 375738,
  epochSlotNo: 0,
  account: 100
};

describe("EpochOverview", () => {
  it("should render on PC", () => {
    render(<EpochOverview data={mockedData} lastUpdated={1} loading={false} />);
    expect(screen.getByText(formatDateTimeLocal(mockedData.startTime))).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(mockedData.endTime))).toBeInTheDocument();
    expect(screen.getByText("417")).toBeInTheDocument();
  });

  it("should show loading state", () => {
    const { container } = render(<EpochOverview data={mockedData} lastUpdated={1} loading={true} />);
    expect(screen.queryByText(formatDateTimeLocal(mockedData.startTime))).not.toBeInTheDocument();
    expect(screen.queryByText(formatDateTimeLocal(mockedData.endTime))).not.toBeInTheDocument();
    expect(screen.queryByText("417")).not.toBeInTheDocument();
    expect(container.getElementsByClassName("MuiSkeleton-root").length).toBeGreaterThan(0);
  });
});
