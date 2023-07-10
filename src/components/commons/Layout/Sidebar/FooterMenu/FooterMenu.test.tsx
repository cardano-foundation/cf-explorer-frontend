import { render, screen } from "src/test-utils";

import FooterMenu from ".";

describe("FooterMenu component", () => {
  it("should component render", () => {
    render(<FooterMenu />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
