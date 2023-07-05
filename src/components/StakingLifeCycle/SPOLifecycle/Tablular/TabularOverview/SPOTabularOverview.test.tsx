import { render, screen } from "src/test-utils";

import TabularOverview from ".";

describe("TabularOverview component", () => {
  it("should component render", () => {
    render(<TabularOverview />);
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /epoch/i
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/owner account/i)).toBeInTheDocument();
  });
});
