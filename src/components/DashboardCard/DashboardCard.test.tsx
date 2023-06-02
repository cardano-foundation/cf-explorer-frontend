import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

import { render } from "src/test-utils";

import DashboardCard from ".";

const props = {
  to: "/mock-new-page",
  title: "mock dashboard card",
  subtitle: "mock subtitle"
};

describe("DashboardCard", () => {
  it("should render dashboard card", async () => {
    render(<DashboardCard {...props} />);
    expect(screen.getByText("mock dashboard card")).toBeInTheDocument();
    expect(screen.getByText("mock subtitle")).toBeInTheDocument();
  });

  it("should redirect page when click on a card", async () => {
    const history = createMemoryHistory();
    history.push(props.to);
    render(<DashboardCard {...props} />);
    const card = screen.getByText("mock dashboard card");
    await userEvent.click(card);
    expect(history.location.pathname).toBe(props.to);
  });
});
