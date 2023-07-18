import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { act, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import DetailViewTransaction from "./DetailViewTransaction";

const mockHash = "f5ca3b591dfae66ab6032f6d0eb528c00eedf75c394f410ff96d6f22b01ebe9b";
const mockTransaction = {
  tx: {
    hash: "transactionHash123",
    time: "2023-07-03T12:34:56Z",
    blockNo: 1234,
    epochSlot: 100,
    epochNo: 10,
    status: "SUCCESS",
    confirmation: 3,
    fee: 1000,
    totalOutput: 5000,
    maxEpochSlot: 10000
  }
};
const { tx } = mockTransaction;
jest.mock("src/commons/hooks/useFetch");

describe("DetailViewTransaction component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockTransaction
    });
  });
  it("should component render", () => {
    render(<DetailViewTransaction handleClose={jest.fn()} hash={mockHash} />);
    expect(screen.getByText(tx.blockNo)).toBeInTheDocument();
    expect(screen.getByText(tx.status)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockHash })).toBeInTheDocument();
  });

  it("should component goto detail pages", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <DetailViewTransaction handleClose={jest.fn()} hash={mockHash} />
      </Router>
    );
    act(() => {
      userEvent.click(screen.getByRole("link", { name: /view details/i }));
    });
    expect(history.location.pathname).toBe(details.transaction(mockHash));
  });
});
