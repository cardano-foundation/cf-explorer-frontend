import { render, screen } from "@testing-library/react";
import RecentWithdraws from ".";
import Router from "react-router";

test("should render RecentWithdraws call mock api", async () => {
  const onSelect = jest.fn();
  jest.spyOn(Router, "useParams").mockReturnValue({
    stakeId: "1",
  });

  render(<RecentWithdraws onSelect={onSelect} />);
  expect(screen.getByText("Recent Withdraws")).toBeInTheDocument();
});
