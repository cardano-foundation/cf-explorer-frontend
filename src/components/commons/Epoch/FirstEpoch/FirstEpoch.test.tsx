import { useSelector } from "react-redux";

import { render, screen } from "src/test-utils";

import FirstEpoch from "./index";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

const FIVE_DAY = 5 * 24 * 3600 * 1000;

const mockedCurrentEpoch: EpochCurrentType = {
  no: 10,
  slot: 100,
  totalSlot: 432000,
  account: 0,
  startTime: new Date().toString(),
  endTime: new Date(Date.now() + FIVE_DAY).toString(),
  circulatingSupply: 33999888
};
const mockedEpochData: IDataEpoch = {
  blkCount: 1197,
  txCount: 0,
  epochSlotNo: mockedCurrentEpoch.slot,
  no: mockedCurrentEpoch.no,
  maxSlot: mockedCurrentEpoch.totalSlot,
  outSum: 14328019575995152,
  rewardsDistributed: 0,
  endTime: mockedCurrentEpoch.endTime,
  startTime: mockedCurrentEpoch.startTime,
  status: "IN_PROGRESS",
  account: 100
};

describe("FirstEpoch component", () => {
  it("rendering component on PC", () => {
    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue({ currentEpoch: mockedCurrentEpoch });

    render(<FirstEpoch data={mockedEpochData} onClick={jest.fn()} />);
    expect(screen.getByText(new RegExp(mockedEpochData.maxSlot.toString(), "i"))).toBeInTheDocument();
    expect(screen.getByText(mockedEpochData.no)).toBeInTheDocument();
  });
});
