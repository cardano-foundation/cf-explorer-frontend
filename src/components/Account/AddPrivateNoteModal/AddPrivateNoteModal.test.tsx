import { render, screen } from "src/test-utils";

import AddPrivateNoteModal from "./index";

describe("AddPrivateNoteModal component", () => {
  it("redering component on PC", () => {
    render(
      <AddPrivateNoteModal
        open={true}
        handleCloseModal={jest.fn()}
        refresh={jest.fn()}
        currentNote={{ hash: "test", id: 1, note: "" }}
      />
    );
    const heading = screen.getByRole("heading", { name: /view\/update my transaction private note/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/transaction hash/i)).toBeInTheDocument();
    expect(screen.getByText(/view\/ update private note/i)).toBeInTheDocument();
  });

  it("test input is empty", () => {
    render(
      <AddPrivateNoteModal
        open={true}
        handleCloseModal={jest.fn()}
        refresh={jest.fn()}
        currentNote={{ hash: "27904c99fddc120a1a1ded07d86a288cd238c046c8c2da94dec33bd943d406f1", id: 68, note: "" }}
      />
    );
    const btnUpdate = screen.getByRole("button", { name: /update/i });
    expect(btnUpdate).toBeInTheDocument();
    expect(btnUpdate.getAttribute("disabled")).toBeFalsy();
  });
});
