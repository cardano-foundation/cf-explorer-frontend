import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useSelector } from "react-redux";

import { act, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import DetailViewBlock from "./DetailViewBlock";
const mockData: BlockDetail = {
  blockNo: 1234,
  epochNo: 10,
  epochSlotNo: 100,
  slotNo: 500,
  hash: "blockHash123",
  slotLeader: "slotLeader123",
  time: "2023-07-03 12:34:56Z",
  totalFees: 1000,
  totalOutput: 5000,
  txCount: 10,
  totalSlot: 10000,
  confirmation: 3
};
jest.mock("src/commons/hooks/useFetch");
jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
  };
});

describe("DetailViewBlock component˝", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData,
      lastUpdated: "2023-09-03 12:34:56Z"
    });
    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector
      .mockReturnValueOnce(mockData.epochNo)
      .mockReturnValueOnce(mockData.blockNo)
      .mockReturnValue({ sidebar: true });
  });

  it("should component render", () => {
    render(<DetailViewBlock blockNo={mockData.blockNo} handleClose={jest.fn()} open={true} />);
    const epochNo = screen.getByText(mockData.blockNo);
    const blockHash = screen.getByRole("link", { name: new RegExp(mockData.hash) });

    expect(epochNo).toBeInTheDocument();
    expect(blockHash).toBeInTheDocument();
  });

  it("should view more button was clicked", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <DetailViewBlock blockNo={mockData.blockNo} handleClose={jest.fn()} open={true} />
      </Router>
    );
    const viewDetail = screen.getByRole("link", { name: /view details/i });
    act(() => {
      userEvent.click(viewDetail);
    });
    expect(history.location.pathname).toBe(details.block(mockData.blockNo));
  });
});
