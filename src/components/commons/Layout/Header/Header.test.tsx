import { render, screen } from "src/test-utils";

import Header from ".";

describe("Header component", () => {
  it("should component render", () => {
    render(<Header />);
    expect(screen.getByText(/a Cardano explorer/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /all filters/i })).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
});
