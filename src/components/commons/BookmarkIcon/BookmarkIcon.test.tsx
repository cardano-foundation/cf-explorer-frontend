import { render, screen } from "src/test-utils";

import BookmarkButton from ".";

describe("BookmarkButton component", () => {
  it("should component render", () => {
    render(<BookmarkButton keyword="bookmark-icon" type="ADDRESS" />);
    expect(screen.getByRole("button", { name: /please sign in to save your bookmark/i })).toBeInTheDocument();
  });
});
