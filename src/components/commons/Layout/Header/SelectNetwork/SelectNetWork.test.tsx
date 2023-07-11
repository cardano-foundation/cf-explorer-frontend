import { render, screen } from "src/test-utils";

import SelectNetwork from ".";

describe("SelectNetWork component", () => {
  it("should component render", () => {
    render(<SelectNetwork />);
    expect(screen.getByRole("button", { name: /mainnet/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { hidden: true })).toBeInTheDocument();
  });
});
