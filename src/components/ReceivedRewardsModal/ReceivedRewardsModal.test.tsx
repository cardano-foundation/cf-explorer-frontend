import { screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import { render } from "src/test-utils";

import ReceivedRewardsModal, { ReceivedRewardsType } from ".";

describe("test received reward modal", () => {
  test("Render ReceivedRewardsModal modal", async () => {
    const onClose = jest.fn();
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ReceivedRewardsModal onClose={onClose} reward={1} type={ReceivedRewardsType.ALL}/>
      </Router>
    );
    const elm = await screen.findByText("Received Rewards");
    expect(elm).toBeInTheDocument();
  });
});
