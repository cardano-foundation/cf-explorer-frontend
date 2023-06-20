import { render, screen } from "src/test-utils";

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
  epochSlotNo: 0
};

describe("EpochOverview", () => {
  it("should render on PC", () => {
    render(<EpochOverview data={mockedData} lastUpdated={1} loading={false} />);
    expect(screen.getByText("06/15/2023 04:44:28")).toBeInTheDocument();
    expect(screen.getByText("06/10/2023 04:47:26")).toBeInTheDocument();
    expect(screen.getByText("417")).toBeInTheDocument();
  });

  it("should show loading state", () => {
    const { container } = render(<EpochOverview data={mockedData} lastUpdated={1} loading={true} />);
    expect(screen.queryByText("06/15/2023 04:44:28")).not.toBeInTheDocument();
    expect(screen.queryByText("06/10/2023 04:47:26")).not.toBeInTheDocument();
    expect(screen.queryByText("417")).not.toBeInTheDocument();
    expect(container.getElementsByClassName("MuiSkeleton-root").length).toBeGreaterThan(0);
  });
});
