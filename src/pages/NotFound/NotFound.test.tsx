import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { routers } from "src/commons/routers";

import NotFound from ".";

describe("NotFound page", () => {
  it("should component render", () => {
    render(<NotFound />);
    const title = screen.getByRole("heading", { name: /sorry! the page you’re looking for cannot be found\./i });
    expect(screen.getByRole("img", { name: /404/i })).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to home/i })).toBeInTheDocument();
  });

  it("should user goback to home page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <NotFound />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /back to home/i }));
    expect(history.location.pathname).toBe(routers.HOME);
  });
});
