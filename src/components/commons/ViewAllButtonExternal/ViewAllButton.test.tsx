import { render, screen } from "src/test-utils";

import ViewAllButtonExternal from ".";

describe("ViewMoreButtonExternal component", () => {
  it("should component render", () => {
    render(<ViewAllButtonExternal to={"https://cardanofoundation.org/en/news/"} />);
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole("img", { name: /view all/i })).toBeInTheDocument();
  });
});
