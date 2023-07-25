import { render, screen } from "src/test-utils";

import TopSearch from ".";

describe("TopSearch component", () => {
  it("should component render", () => {
    render(<TopSearch open={true} onClose={jest.fn()} />);

    expect(screen.getByTestId("sentinelStart")).toBeInTheDocument();
    expect(screen.getByTestId("header-search")).toBeInTheDocument();
    expect(screen.getByTestId("all-filters-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("header-search")).toBeInTheDocument();
    expect(screen.getByTestId("header-search")).toBeInTheDocument();
  });
});
