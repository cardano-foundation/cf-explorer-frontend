import { render, screen } from "src/test-utils";

import { ADAToken } from ".";

describe("Token component", () => {
  it("should component render", () => {
    render(<ADAToken />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
