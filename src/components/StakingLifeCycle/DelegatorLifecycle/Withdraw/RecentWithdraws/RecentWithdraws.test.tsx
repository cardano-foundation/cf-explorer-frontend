import Router from "react-router";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import RecentWithdraws from ".";

describe("RecentWithdraws", () => {
  it("should render RecentWithdraws call mock api", async () => {
    const onSelect = jest.fn();
    jest.spyOn(Router, "useParams").mockReturnValue({
      stakeId: "1"
    });

    render(<RecentWithdraws onSelect={onSelect} setShowBackButton={jest.fn()} />);
    expect(screen.getByText("Recent Withdrawals")).toBeInTheDocument();
  });
});
