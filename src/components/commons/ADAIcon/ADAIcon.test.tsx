import { render, screen } from "src/test-utils";

import ADAIcon from ".";

describe("ADAIcon component", () => {
  it("should component render", () => {
    render(<ADAIcon />);
    expect(screen.getByTestId("ada-icon")).toBeInTheDocument();
  });
});
