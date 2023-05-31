import { screen } from "@testing-library/react";
import ReceivedRewardsModal from ".";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "src/test-utils";

describe("test received reward modal", () => {
  test("Render ReceivedRewardsModal modal", async () => {
    const onClose = jest.fn();
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReceivedRewardsModal open={true} onClose={onClose} reward={1} />
      </Router>
    );
    const elm = await screen.findByText("Received Rewards");
    expect(elm).toBeInTheDocument();
  });
});
