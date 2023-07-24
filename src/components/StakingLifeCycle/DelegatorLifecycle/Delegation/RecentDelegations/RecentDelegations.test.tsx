import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import RecentDelegations from ".";

describe("RecentDelegations", () => {
  it("should render RecentDelegations component", async () => {
    const onSelect = jest.fn();
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });

    render(<RecentDelegations onSelect={onSelect} setShowBackButton={jest.fn()} />);
    expect(screen.getByText("Recent Delegations")).toBeInTheDocument();
  });
});
