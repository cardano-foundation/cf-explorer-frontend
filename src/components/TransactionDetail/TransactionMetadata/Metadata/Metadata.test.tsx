import { render, screen } from "src/test-utils";

import Metadata from ".";

const metaData = [{ label: 1, value: "First Metadata" }];

describe("Metadata component", () => {
  it("should component render", () => {
    render(<Metadata data={metaData} hash="tx0023131hash33x" />);
    expect(screen.getByText(/metadata hash/i)).toBeInTheDocument();
    expect(screen.getByText(/tx0023131hash33x/i)).toBeInTheDocument();
    expect(screen.getByText(/publish label/i)).toBeInTheDocument();
  });
});
