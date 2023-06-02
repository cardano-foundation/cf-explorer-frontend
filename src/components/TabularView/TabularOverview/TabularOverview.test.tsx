import { screen } from "@testing-library/react";
import { render } from "src/test-utils";
import TabularOverview from ".";

describe("TabularOverview", () => {
  it("should render tabular overview", () => {
    render(<TabularOverview />);
    expect(screen.getByText("Payment Wallet")).toBeInTheDocument();
    expect(screen.getByText("Reward Account")).toBeInTheDocument();
    expect(screen.getByText("Rewards Withdrawn")).toBeInTheDocument();
    expect(screen.getByText("Delegating To")).toBeInTheDocument();
  });
});
