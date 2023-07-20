import { render, screen } from "src/test-utils";

import RateWithIcon from ".";

describe("RateWithIcon component", () => {
  it("should component render", () => {
    render(<RateWithIcon value={100} />);
    expect(screen.getByRole("img", { name: /rate/i })).toBeInTheDocument();
    expect(screen.getByText(/\+100,00 %/i)).toBeInTheDocument();
  });

  it("should compoent render with negative", () => {
    render(<RateWithIcon value={100} multiple={-10} />);
    expect(screen.getByRole("img", { name: /rate/i })).toBeInTheDocument();
    expect(screen.getByText(/-1000,00 %/i)).toBeInTheDocument();
  });
});
