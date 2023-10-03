import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { formatADAFull } from "src/commons/utils/helper";

import DetailViewEpoch from "./DetailViewEpoch";

const mockedData = {
  blkCount: 20947,
  endTime: "2023/06/14 21:44:28",
  maxSlot: 432000,
  no: 417,
  outSum: 229341415829835740,
  rewardsDistributed: null,
  startTime: "2023/06/09 21:47:26",
  status: "REWARDING",
  txCount: 375738
};

jest.mock("src/commons/hooks/useFetch");

describe("DetailViewEpoch component", () => {
  beforeEach(() => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: mockedData,
      lastUpdated: "2023/06/14 21:44:28"
    });
  });
  it("rendering component on PC", () => {
    render(<DetailViewEpoch callback={jest.fn()} epochNo={123} handleClose={jest.fn()} open={true} />);
    expect(screen.getAllByText(/View Details/i)[0]).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /20947/i })).toBeInTheDocument();
    expect(screen.getByText(mockedData.txCount)).toBeInTheDocument();
    expect(screen.getByText(formatADAFull(mockedData.outSum))).toBeInTheDocument();
  });
});
