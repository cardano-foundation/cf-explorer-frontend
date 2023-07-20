import { render, screen } from "src/test-utils";
import { getShortWallet } from "src/commons/utils/helper";

import ConnectedProfileOption from ".";

const stakeKey = "stake1u98ujxfgzdm8yh6qsaar54nmmr50484t4ytphxjex3zxh7g4tuwna";

describe("BookmarkButton component", () => {
  it("should component render", () => {
    render(<ConnectedProfileOption disconnect={jest.fn()} isConnected={true} stakeAddress={stakeKey} />);
    const stakeKeyEl = screen.getByRole("button", {
      name: getShortWallet(stakeKey)
    });
    expect(stakeKeyEl).toBeInTheDocument();
  });
});
