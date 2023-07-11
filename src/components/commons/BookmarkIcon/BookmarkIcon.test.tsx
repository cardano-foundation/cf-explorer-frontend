import { render, screen } from "src/test-utils";

import BookmarkButton from ".";

describe("BookmarkButton component", () => {
  it("should component render", () => {
    render(<BookmarkButton keyword="bookmark-icon" type="ADDRESS" />);
    expect(
      screen.getByRole("button", {
        name: /bookmark\.svg/i
      })
    ).toBeInTheDocument();
  });
});
