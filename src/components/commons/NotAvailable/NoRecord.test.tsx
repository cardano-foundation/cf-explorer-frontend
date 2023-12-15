import { render, screen } from "src/test-utils";

import NoRecord from ".";

describe("NoRecord component", () => {
  it("should component render", () => {
    render(<NoRecord />);
    expect(screen.getByAltText("not avaialble icon")).toBeInTheDocument();
  });
});
