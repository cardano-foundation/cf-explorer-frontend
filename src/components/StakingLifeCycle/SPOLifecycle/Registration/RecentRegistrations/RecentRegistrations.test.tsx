import { screen } from "@testing-library/react";
import RecentRegistrations from ".";
import Router from "react-router";
import { render } from "src/test-utils";

test("should render SPO RecentRegistrations call mock api", async () => {
  jest.spyOn(Router, "useParams").mockReturnValue({
    stakeId: "1"
  });
  const onSelect = jest.fn();
  render(<RecentRegistrations onSelect={onSelect} />);
  expect(screen.getByText("Registration List")).toBeInTheDocument();
});
