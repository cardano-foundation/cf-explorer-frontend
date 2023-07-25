import { render, screen } from "src/test-utils";

import SelectNetwork from ".";

describe("SelectNetWork component", () => {
  it("should component render", () => {
    render(<SelectNetwork />);
    expect(screen.getByRole("textbox", { hidden: true })).toBeInTheDocument();
    expect((screen.getByRole("textbox", { hidden: true }) as HTMLInputElement).value).toBe("mainnet");
    expect(screen.getByRole("group", { hidden: true })).toBeInTheDocument();
  });
});
