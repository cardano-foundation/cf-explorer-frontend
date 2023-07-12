import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";

import ViewMoreButton from ".";

describe("ViewMoreButton component", () => {
  it("should component render", () => {
    render(<ViewMoreButton to={"/example"} />);

    expect(screen.getByRole("link", { name: /view details/i })).toBeInTheDocument();
  });
  it("should component redirect to details", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <ViewMoreButton to={"/example"} />
      </Router>
    );

    fireEvent.click(screen.getByRole("link", { name: /view details/i }));
    expect(history.location.pathname).toBe("/example");
  });
});
