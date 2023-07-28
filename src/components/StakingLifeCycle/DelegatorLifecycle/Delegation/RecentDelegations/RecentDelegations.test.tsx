import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import RecentDelegations from ".";

describe("RecentDelegations", () => {
  it("should render RecentDelegations component", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });

    render(<RecentDelegations setShowBackButton={jest.fn()} />);
    expect(screen.getByText("Recent Delegations")).toBeInTheDocument();
  });
});
