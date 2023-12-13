import { render, screen } from "src/test-utils";

import TransactionSignatories from ".";

const mockData = [
  { publicKey: "816ebee18d53ab3de74f9c0ef7d6d5ed474a2d545b63d4b72f3b891f55cd66cd" },
  { publicKey: "816ebee18d53ab3de74f9c0ef7d6d5ed474a2d545b63d4b72f3b891f55cd66c2" },
  { publicKey: "816ebee18d53ab3de74f9c0ef7d6d5ed474a2d545b63d4b72f3b891f55cd66c3" }
];

describe("Transaction Signatures test", () => {
  beforeEach(() => {
    render(<TransactionSignatories data={mockData} />);
  });

  it("should component render", () => {
    expect(screen.getByText(/Signer Public Key Hash/i)).toBeInTheDocument();

    expect(screen.getByText(mockData[0].publicKey)).toBeInTheDocument();
    expect(screen.getByText(mockData[1].publicKey)).toBeInTheDocument();
    expect(screen.getByText(mockData[2].publicKey)).toBeInTheDocument();
  });
});
