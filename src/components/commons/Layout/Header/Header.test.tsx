import { render, screen } from "src/test-utils";

import Header from ".";

describe("Header component", () => {
  it("should component render", () => {
    render(<Header />);
    expect(screen.getByRole("heading", { name: /cardano blockchain explorer/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /all filters/i })).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
});
