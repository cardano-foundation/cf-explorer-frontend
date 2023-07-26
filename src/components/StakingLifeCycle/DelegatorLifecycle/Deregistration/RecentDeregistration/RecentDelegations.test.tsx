import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import RecentDeregistration from ".";

describe("RecentDeregistrations", () => {
  test("should render RecentDeregistration call mock api", async () => {
    const onSelect = jest.fn();
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });

    render(<RecentDeregistration onSelect={onSelect} setShowBackButton={jest.fn()} />);

    expect(screen.getByText("Deregistration List")).toBeInTheDocument();
  });

  test("should render 0 data", async () => {
    const onSelect = jest.fn();
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });
    render(<RecentDeregistration onSelect={onSelect} setShowBackButton={jest.fn()} />);

    expect(screen.getByText("Showing 0 result")).toBeInTheDocument();
  });
});
