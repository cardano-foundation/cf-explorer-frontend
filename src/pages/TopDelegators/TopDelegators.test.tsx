import { render, screen } from "src/test-utils";

import TopDelegators from ".";

describe("TopDelegators page", () => {
  it("should component render", () => {
    render(<TopDelegators />);
    expect(screen.getByText(/delegators/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /stake key addresses/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /pool/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /stake amount/i })).toBeInTheDocument();
  });
});
