import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import StakeKeyBox from "./StakeKeyBox";

const mockData: TStakeCertificated = {
  stakeAddress: "stake-address",
  type: "STAKE_REGISTRATION"
};
describe("StakeKeyBox component", () => {
  it("should component render", () => {
    render(<StakeKeyBox data={mockData} />);
    expect(screen.getByText(/stake address:/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/ellipsis-text/)[0]).toBeInTheDocument();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <StakeKeyBox data={mockData} />
      </Router>
    );
    fireEvent.click(screen.getAllByTestId(/ellipsis-text/)[0]);
    expect(history.location.pathname).toBe(details.stake(mockData.stakeAddress));
  });
});
