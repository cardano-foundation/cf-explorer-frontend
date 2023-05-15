import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import PopupStaking from ".";
import { getShortHash } from "../../../commons/utils/helper";
import { details } from "../../../commons/routers";
import { ThemeProvider } from "@mui/material";
import themes from "../../../themes";

const hash = "f0cc0767ea4cf06ce45a85db8f17f930576af1b06f327b8d9d5d25c17f962166";

test("Render popup staking", async () => {
  const history = createMemoryHistory();

  render(
    <ThemeProvider theme={themes.light}>
      <Router history={history}>
        <PopupStaking hash={hash} />{" "}
      </Router>
    </ThemeProvider>
  );
  expect(screen.getByText(getShortHash(hash))).toBeInTheDocument();
});

test("run click popup staking navigate", async () => {
  const history = createMemoryHistory();
  render(
    <ThemeProvider theme={themes.light}>
    <Router history={history}>
      <PopupStaking hash={hash} />
    </Router>
    </ThemeProvider>
  );
  const aboutItem = screen.getByText(getShortHash(hash));
  await userEvent.click(aboutItem);
  expect(history.length).toBe(2);
  expect(history.location.pathname).toBe(details.transaction(hash));
});
