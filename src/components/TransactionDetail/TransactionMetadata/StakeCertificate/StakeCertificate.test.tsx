import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import StakeCertificate from ".";

const mockData: TStakeCertificated = {
  stakeAddress: "stake-address",
  type: "STAKE_REGISTRATION"
};
describe("StakeCertificate component", () => {
  it("should component render", () => {
    render(<StakeCertificate data={[mockData]} />);
    expect(screen.getByText(/stake addresss registrations/i)).toBeInTheDocument();
    expect(screen.getByText(/address stake key:/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockData.stakeAddress })).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <StakeCertificate data={[mockData]} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.stakeAddress }));
    expect(history.location.pathname).toBe(details.stake(mockData.stakeAddress));
  });
});
