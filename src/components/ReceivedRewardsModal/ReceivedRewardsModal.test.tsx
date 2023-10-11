import { screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render } from "src/test-utils";
import { RECEIVED_REWARDS } from "src/commons/utils/constants";

import ReceivedRewardsModal from ".";

describe("test received reward modal", () => {
  test("Render ReceivedRewardsModal modal", async () => {
    const onClose = jest.fn();
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReceivedRewardsModal open={true} onClose={onClose} reward={1} type={RECEIVED_REWARDS.ALL} />
      </Router>
    );
    const elm = await screen.findByText("Received Rewards");
    expect(elm).toBeInTheDocument();
  });
});
