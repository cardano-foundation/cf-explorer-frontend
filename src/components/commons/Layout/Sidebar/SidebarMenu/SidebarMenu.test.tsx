import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";

import SidebarMenu from ".";

describe("SidebarMenu", () => {
  it("should component render", () => {
    render(<SidebarMenu />);
    expect(screen.getByText(/blockchain/i)).toBeInTheDocument();
    expect(screen.getByText(/operational certificates/i)).toBeInTheDocument();
    expect(screen.getByText(/browse/i)).toBeInTheDocument();
  });

  it("should component route to next page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <SidebarMenu />
      </Router>
    );
    const stakingPage = screen.getByTestId("menu-button-staking_lifecycle");
    const protocolParamsPagep = screen.getByTestId("menu-button-protocol_parameters");
    expect(stakingPage).toBeInTheDocument();
    expect(protocolParamsPagep).toBeInTheDocument();

    fireEvent.click(stakingPage);
    expect(history.location.pathname).toBe("/stacking-lifecycle/stake-key");

    fireEvent.click(protocolParamsPagep);
    expect(history.location.pathname).toBe("/protocol-parameters");
  });
});
