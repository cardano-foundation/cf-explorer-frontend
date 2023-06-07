import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { render } from "src/test-utils";
import { getShortHash } from "src/commons/utils/helper";
import { details } from "src/commons/routers";

import PopupStaking from ".";

const hash = "f0cc0767ea4cf06ce45a85db8f17f930576af1b06f327b8d9d5d25c17f962166";

test("Render popup staking", async () => {
  render(<PopupStaking hash={hash} />);
  expect(screen.getByText(getShortHash(hash))).toBeInTheDocument();
});

test("run click popup staking navigate", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <PopupStaking hash={hash} />
    </Router>
  );
  const aboutItem = screen.getByText(getShortHash(hash));
  await userEvent.click(aboutItem);
  expect(history.location.pathname).toBe(details.transaction(hash));
});
