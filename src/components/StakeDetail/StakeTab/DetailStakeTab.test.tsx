import { render, screen } from "src/test-utils";

import StakeTab from ".";

describe("StakeTab component", () => {
  it("should component render", () => {
    render(<StakeTab />);
    expect(screen.getByRole("tab", { name: /delegationhistory\.svg delegation history/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /statekeyhistory\.svg stake key history/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /instantaneoushistory\.svg instantaneous rewards/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /delegationhistory\.svg delegation history/i })).toBeInTheDocument();
  });
});
