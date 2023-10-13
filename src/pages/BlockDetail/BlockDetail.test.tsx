import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import BlockDetail from ".";

const blockDetail: BlockDetail = {
  blockNo: 12345,
  epochNo: 42,
  epochSlotNo: 987,
  slotNo: 6789,
  hash: "0x0123456789abcdef",
  slotLeader: "slot_leader_address",
  time: "2023-07-20T12:34:56Z",
  totalFees: 100.5,
  totalOutput: 2500.75,
  txCount: 10,
  totalSlot: 10000,
  confirmation: 6
};

jest.mock("src/commons/hooks/useFetch");

describe("BlockDetail page", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: blockDetail,
      loading: false,
      initialized: true,
      error: false
    });
  });

  it("should component render", () => {
    render(<BlockDetail />);
    expect(screen.getByText(/block details/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /transactions/i })).toBeInTheDocument();
    expect(screen.getByText(/0x012/)).toBeInTheDocument();
  });

  it("should component render with error", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      initialized: true,
      error: false,
      lastUpdated: Date.now()
    });
    render(<BlockDetail />);
    expect(screen.getByRole("img", { name: /empty icon/i })).toBeInTheDocument();
  });

  it("should useFetch func call with params", () => {
    const fetchImpFunc = jest.fn().mockReturnValue({
      data: blockDetail,
      loading: false,
      initialized: true,
      error: false,
      lastUpdated: Date.now()
    });
    (useFetch as jest.Mock).mockImplementation(fetchImpFunc);
    render(<BlockDetail />);
    expect(fetchImpFunc).toHaveBeenCalledWith(`blocks/${undefined}`, undefined, false, undefined);
  });
});
