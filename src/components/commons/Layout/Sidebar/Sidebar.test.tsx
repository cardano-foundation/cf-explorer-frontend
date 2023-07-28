import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";

import Sidebar from ".";

describe("Sidebar component", () => {
  it("should component render", () => {
    render(<Sidebar />);

    expect(screen.getByRole("link", { name: /logo cardano/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /browse/i })).toBeInTheDocument();
    expect(screen.getByText(/resources/i)).toBeInTheDocument();
  });

  it("should component route to dashboard route", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <Sidebar />
      </Router>
    );

    fireEvent.click(screen.getByRole("link", { name: /logo cardano/i }));
    expect(history.location.pathname).toBe("/");
  });
});
