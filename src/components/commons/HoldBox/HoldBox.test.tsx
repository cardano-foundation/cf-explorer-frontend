import { render, screen } from "src/test-utils";

import HoldBox from ".";

const mockHash = "f840354982636c385870efc3c187a4b506ef49176413b912bf3bcef0b918af31";

describe("HoldBox component", () => {
  it("should component render", () => {
    render(<HoldBox txHash={mockHash} value={100000000} />);
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/buttonlist\.svg/i)).toBeInTheDocument();
    expect(screen.getByText(/ada-logo\.svg/i)).toBeInTheDocument();
  });
});
