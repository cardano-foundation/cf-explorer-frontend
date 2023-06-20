import { render, screen } from "src/test-utils";

import FirstEpoch from "./index";

const mockedEpochData: IDataEpoch = {
  blkCount: 1197,
  endTime: "2023/06/19 21:44:54",
  maxSlot: 432000,
  no: 418,
  outSum: 14328019575995152,
  rewardsDistributed: 0,
  startTime: "2023/06/14 21:44:54",
  status: "IN_PROGRESS",
  epochSlotNo: 0,
  txCount: 0
};

describe("FirstEpoch component", () => {
  it("rendering component on PC", () => {
    render(<FirstEpoch data={mockedEpochData} onClick={jest.fn()} />);
    expect(screen.getByText(new RegExp(mockedEpochData.maxSlot.toString(), "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`epoch number ${mockedEpochData.no}`, "i"))).toBeInTheDocument();
  });
});
