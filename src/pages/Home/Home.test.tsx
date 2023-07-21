import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen, within } from "src/test-utils";
import { routers } from "src/commons/routers";

import Home from ".";

describe("Home page", () => {
  it("should component render", () => {
    render(<Home />);
    const view = screen.getByTestId("home-latest-transactions");
    expect(screen.getByRole("heading", { name: /transactions in the last day/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /latest transactions/i })).toBeInTheDocument();
    expect(screen.getByText(/sorted by blocks produced in the current epoch/i)).toBeInTheDocument();
    expect(within(view).getByRole("img", { name: /view all/i })).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  it("should user goto transactions page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <Home />
      </Router>
    );
    const view = screen.getByTestId("home-latest-transactions");
    fireEvent.click(within(view).getByRole("img", { name: /view all/i }));
    expect(history.location.pathname).toBe(routers.TRANSACTION_LIST);
  });
});
