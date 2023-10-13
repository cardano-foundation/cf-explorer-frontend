import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import Delegations from ".";

const mockProps = [{ address: "address-1", poolId: "pool-id-1" }];

describe("Delegations component", () => {
  it("should component render", () => {
    render(<Delegations data={mockProps} />);
    expect(screen.getByText(/stake address/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("ellipsis-text")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("ellipsis-text")[1]).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <Delegations data={mockProps} />
      </Router>
    );
    fireEvent.click(screen.getAllByTestId("ellipsis-text")[0]);
    expect(history.location.pathname).toBe(details.stake(mockProps[0].address));
    fireEvent.click(screen.getAllByTestId("ellipsis-text")[1]);
    expect(history.location.pathname).toBe(details.delegation(mockProps[0].poolId));
  });
});
