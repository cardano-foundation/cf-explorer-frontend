import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import RecentDeregistration from ".";

describe("RecentDeregistrations", () => {
  test("should render RecentDeregistration call mock api", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });

    render(<RecentDeregistration setShowBackButton={jest.fn()} />);

    expect(screen.getByText("Deregistration List")).toBeInTheDocument();
  });

  test("should render 0 data", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });
    render(<RecentDeregistration setShowBackButton={jest.fn()} />);

    expect(screen.getByText(/Showing 0 result/i)).toBeInTheDocument();
  });
});
