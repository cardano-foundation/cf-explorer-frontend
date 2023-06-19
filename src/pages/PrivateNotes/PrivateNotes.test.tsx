import userEvent from "@testing-library/user-event";

import { render, screen, within } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { getShortHash } from "src/commons/utils/helper";

import PrivateNotes from "./index";

const mockedData = [
  {
    id: 68,
    txHash: "27904c99fddc120a1a1ded07d86a288cd238c046c8c2da94dec33bd943d406f1",
    createdDate: "2023-05-28T17:21:35.609380Z",
    note: "TestTestTestTestTestTestTestTestTestTestTestTestTestTestTest"
  },
  {
    id: 65,
    txHash: "388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426",
    createdDate: "2023-05-27T13:09:46.444904Z",
    note: "388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07ec388ea07ec4c8d39dcfa4e468076f3b3c02d38d9e2d9c7e408e7f5beaca7c6426388ea07"
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

  it("testing remove private note dialog", () => {
    render(<PrivateNotes />);
    const row = screen.getByRole("row", {
      name: /27904c99fddc120a1a1ded07d86a288cd238c046c8c2da94dec33bd943d406f1 testtesttesttesttesttesttesttesttesttesttesttesttesttesttest 05\/29\/2023 00:21:35/i
    });
    const btnRemove = within(row).getByRole("button", { name: /remove note/i });
    userEvent.click(btnRemove);
    expect(screen.getByText(/confirmation required/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  it("testing view private note dialog", () => {
    render(<PrivateNotes />);
    const row = screen.getByRole("row", {
      name: /27904c99fddc120a1a1ded07d86a288cd238c046c8c2da94dec33bd943d406f1 testtesttesttesttesttesttesttesttesttesttesttesttesttesttest 05\/29\/2023 00:21:35/i
    });
    const btnEdit = within(row).getByRole("button", { name: /view private note/i });
    userEvent.click(btnEdit);
    const heading = screen.getByRole("heading", { name: /view\/update my transaction private note/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/transaction hash/i)).toBeInTheDocument();
    expect(screen.getByText(/view\/ update private note/i)).toBeInTheDocument();
  });
});
