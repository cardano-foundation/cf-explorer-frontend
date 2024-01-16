import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";

import ViewAllButton from ".";

jest.mock("src/commons/resources", () => {
  const SeeMoreIconHome = () => <div data-testid="view-all-button">link</div>;
  return { SeeMoreIconHome };
});
describe("ViewMoreButton component", () => {
  it("should component render", () => {
    render(<ViewAllButton to={"/example"} />);
    expect(screen.getByTestId(/view-all-button/i)).toBeInTheDocument();
  });
  it("should component redirect to details", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <ViewAllButton to={"/example"} />
      </Router>
    );

    fireEvent.click(screen.getByTestId(/view-all-button/i));
    expect(history.location.pathname).toBe("/example");
  });
});
