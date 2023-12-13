import { render, screen } from "src/test-utils";

import { CustomNumberBadge } from ".";

describe("Button Back test", () => {
  it("should component render", () => {
    render(<CustomNumberBadge value={2} />);
    expect(screen.getByTestId("badge-number")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should component render null", () => {
    render(<CustomNumberBadge value={0} />);
    expect(screen.queryByTestId("badge-number")).toBeNull();
  });
});
