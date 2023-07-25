import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";

import ViewAllButton from ".";

describe("ViewMoreButton component", () => {
  it("should component render", () => {
    render(<ViewAllButton to={"/example"} />);
    expect(screen.getByRole("img", { name: /view all/i })).toBeInTheDocument();
  });
  it("should component redirect to details", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <ViewAllButton to={"/example"} />
      </Router>
    );

    fireEvent.click(screen.getByRole("img", { name: /view all/i }));
    expect(history.location.pathname).toBe("/example");
  });
});
