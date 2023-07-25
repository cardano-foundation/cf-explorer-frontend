import { render, screen } from "src/test-utils";

import Card from ".";

describe("BookmarkButton component", () => {
  it("should component render", () => {
    render(<Card title="card title" />);
    expect(
      screen.getByRole("heading", {
        name: new RegExp("card title", "i")
      })
    ).toBeInTheDocument();
  });
});
