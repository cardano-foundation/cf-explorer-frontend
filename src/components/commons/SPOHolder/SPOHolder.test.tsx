import { render, screen } from "src/test-utils";

import SPOHolder from ".";

const mockProps = {
  poolName: "Sample Pool",
  poolView: "pool1abc",
  stakeKeys: ["stakeKey1", "stakeKey2"]
};

describe("SPOHolder component", () => {
  it("should component render", () => {
    render(<SPOHolder data={mockProps} />);
    expect(screen.getByRole("img", { name: /spo image/i })).toBeInTheDocument();
    expect(screen.getByText(/sample pool/i)).toBeInTheDocument();
    expect(screen.getByText(/spoinfo\.svg/i)).toBeInTheDocument();
  });
});
