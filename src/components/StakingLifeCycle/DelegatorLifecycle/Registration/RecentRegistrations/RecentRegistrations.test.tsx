import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import RecentRegistrations from ".";

test("should render RecentRegistrations call mock api", async () => {
  const onSelect = jest.fn();
  jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });

  render(<RecentRegistrations onSelect={onSelect} />);
  const elm = screen.getByTestId("recent-registration");
  expect(elm).toHaveTextContent("Showing");
  expect(elm).toHaveTextContent("Registration List");
});
