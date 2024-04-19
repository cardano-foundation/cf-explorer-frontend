import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { lists } from "src/commons/routers";

import SidebarMenu from ".";

describe("SidebarMenu", () => {
  it("should component render", () => {
    render(<SidebarMenu />);
    expect(screen.getByText(/blockchain/i)).toBeInTheDocument();
    expect(screen.getByText(/operational certificates/i)).toBeInTheDocument();
    expect(screen.getByText(/discover cardano/i)).toBeInTheDocument();
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
    expect(history.location.pathname).toBe(lists.dashboard());

    fireEvent.click(protocolParamsPagep);
    expect(history.location.pathname).toBe(lists.protocolParameters());
  });
});
