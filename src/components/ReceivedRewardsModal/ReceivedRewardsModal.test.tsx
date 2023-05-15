import { render, screen } from "@testing-library/react";
import ReceivedRewardsModal from ".";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { ThemeProvider } from "@mui/material";
import themes from "../../themes";

describe("test received reward modal", () => {
  test("Render ReceivedRewardsModal modal", async () => {
    const onClose = jest.fn();
    const history = createMemoryHistory();

    render(
      <ThemeProvider theme={themes.light}>
        <Router history={history}>
          <ReceivedRewardsModal open={true} onClose={onClose} reward={1} />
        </Router>
      </ThemeProvider>
    );
    const elm = await screen.findByText("Received Rewards");
    expect(elm).toBeInTheDocument();
  });
});
