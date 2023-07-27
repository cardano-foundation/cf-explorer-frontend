import Router from "react-router";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import RecentRegistrations from ".";

test("should render SPO RecentRegistrations call mock api", async () => {
  jest.spyOn(Router, "useParams").mockReturnValue({
    stakeId: "1"
  });
  const onSelect = jest.fn();
  render(<RecentRegistrations onSelect={onSelect} setShowBackButton={jest.fn()} />);
  expect(screen.getByText("Registration List")).toBeInTheDocument();
});
