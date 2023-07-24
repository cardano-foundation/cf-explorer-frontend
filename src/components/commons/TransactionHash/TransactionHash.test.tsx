
import { getShortHash } from "src/commons/utils/helper";
import { render, screen } from "src/test-utils";

import TransactionHash from ".";

const mockHash = "DwEwlgbgfMCGAEsBOZYFoA2sBGBTDAvAEQBqYuA7vAIIYZHwDGWAzi8U22gI";

describe("ViewMoreButton component", () => {
  it("should component render", () => {
    render(<TransactionHash hash={mockHash} />);
    expect(screen.getByText(/addressicon\.svg/i)).toBeInTheDocument();
    expect(screen.getByText(getShortHash(mockHash))).toBeInTheDocument();
  });
});
