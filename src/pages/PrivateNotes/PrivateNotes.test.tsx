import userEvent from "@testing-library/user-event";

import { render, screen, waitFor, within } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTime, getShortHash } from "src/commons/utils/helper";

import PrivateNotes from "./index";

const mockedData = [
  {
    id: 68,
    txHash: "txHash1",
    createdDate: "2023-05-28T17:21:35.609380Z",
    note: "Item1 note"
  },
  {
    id: 65,
    txHash: "txHash2",
    createdDate: "2023-05-27T13:09:46.444904Z",
    note: "abcdefgh"
  }
];

jest.mock("src/commons/hooks/useFetchList");

describe("Private Notes component", () => {
  beforeEach(() => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({ data: mockedData });
  });

  it("rendering component on PC", () => {
    render(<PrivateNotes />);
    expect(screen.getByText(/my transaction private notes/i)).toBeInTheDocument();
  });

  it("rendering component with data", () => {
    render(<PrivateNotes />);
    const data = mockedData[0];
    expect(screen.getByText(/my transaction private notes/i)).toBeInTheDocument();
    expect(screen.getByText(getShortHash(data.txHash))).toBeInTheDocument();
    expect(screen.getByText(data.note)).toBeInTheDocument();
  });

  it("testing remove private note dialog", async () => {
    render(<PrivateNotes />);
    const row = screen.getByRole("row", {
      name: new RegExp(`txHash1 Item1 note ${formatDateTime(mockedData[0].createdDate)}`, "i")
    });
    const btnRemove = within(row).getByRole("button", { name: /remove note/i });
    await userEvent.click(btnRemove);
    await waitFor(() => {
      expect(screen.getByText(/confirmation required/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    });
  });

  it("testing view private note dialog", async () => {
    render(<PrivateNotes />);
    const row = screen.getByRole("row", {
      name: new RegExp(`txHash1 Item1 note ${formatDateTime(mockedData[0].createdDate)}`, "i")
    });
    const btnEdit = within(row).getByRole("button", { name: /view private note/i });
    await userEvent.click(btnEdit);
    await waitFor(() => {
      const heading = screen.getByRole("heading", { name: /view\/update my transaction private note/i });
      expect(heading).toBeInTheDocument();
      expect(screen.getByText(/transaction hash/i)).toBeInTheDocument();
      expect(screen.getByText(/view\/ update private note/i)).toBeInTheDocument();
    });
  });
});
