import { render, screen } from "src/test-utils";

import ADAIcon from ".";

describe("ADAIcon component", () => {
  it("should component render", () => {
    render(<ADAIcon data-testid="ada-icon" />);
    expect(screen.getByTestId("ada-icon")).toBeInTheDocument();
  });
});
