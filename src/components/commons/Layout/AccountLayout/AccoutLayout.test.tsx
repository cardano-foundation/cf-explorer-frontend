import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";

import AccountLayout, { router } from ".";

const MockComponent = () => <span>Contents</span>;

describe("AccountLayout component", () => {
  it("should component render", () => {
    render(
      <AccountLayout>
        <MockComponent />
      </AccountLayout>
    );
    expect(screen.getByRole("heading", { name: /account overview/i })).toBeInTheDocument();
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });

  it("should the router works well", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <AccountLayout>
          <MockComponent />
        </AccountLayout>
      </Router>
    );
    const myProfileLink = screen.getByRole("link", { name: /my profile/i });
    fireEvent.click(myProfileLink);
    expect(history.location.pathname).toBe(router[0].to);
    const bookmarkLink = screen.getByRole("link", { name: /bookmark/i });
    fireEvent.click(bookmarkLink);
    expect(history.location.pathname).toBe(router[1].to);
  });
});
