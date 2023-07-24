import { fireEvent, render, screen } from "src/test-utils";

import TopAddresses from ".";

describe("TopAddresses page", () => {
  it("should component render", () => {
    render(<TopAddresses />);
    expect(screen.getByRole("heading", { name: /top ada holders/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /delegationhistory\.svg by address ada balance/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /statekeyhistory\.svg by amount staked/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { hidden: true })).toBeInTheDocument();
  });

  it("should user change tab", () => {
    render(<TopAddresses />);
    fireEvent.click(screen.getByRole("tab", { name: /statekeyhistory\.svg by amount staked/i }));
    expect(screen.getByText(/delegators/i)).toBeInTheDocument();
  });
});
