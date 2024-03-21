import { render, screen } from "src/test-utils";

import StakeDetail from ".";

describe("StakeDetail page", () => {
  it("should component render", async () => {
    render(<StakeDetail />);
    await new Promise((r) => setTimeout(r, 1000));
    expect(screen.getByTestId("stake-address-detail-title")).toBeInTheDocument();
  });
});
