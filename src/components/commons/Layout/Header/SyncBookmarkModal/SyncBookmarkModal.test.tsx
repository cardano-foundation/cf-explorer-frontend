import { useSelector } from "react-redux";

import { render, screen } from "src/test-utils";

import SyncBookmarkModal from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("src/commons/utils/userRequest", () => ({
  ...jest.requireActual("src/commons/utils/userRequest"),
  addListBookmark: jest.fn()
}));

describe("SyncBookmarkModal", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue({ openSyncBookmarkModal: true });
  });
  it("should component redner", () => {
    render(<SyncBookmarkModal />);
    expect(screen.getByRole("heading", { name: /notify/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sync/i })).toBeInTheDocument();
  });
});
