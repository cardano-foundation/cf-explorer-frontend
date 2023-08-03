import { render, screen } from "src/test-utils";

import StakeTab from ".";

describe("StakeTab component", () => {
  it("should component render", () => {
    render(<StakeTab />);
    expect(screen.getByText("Delegation History")).toBeInTheDocument();
    expect(screen.getByText("Stake Address History")).toBeInTheDocument();
    expect(screen.getByText("Withdrawal History")).toBeInTheDocument();
    expect(screen.getByText("Instantaneous Rewards")).toBeInTheDocument();
  });
});
