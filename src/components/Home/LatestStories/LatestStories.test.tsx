import { screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import moment from "moment";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

import { render } from "src/test-utils";
import { details, routers } from "src/commons/routers";

import LatestStories from ".";

describe("LatestStories", () => {
  it("should render LatestStories and navigate see all", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LatestStories />
      </Router>
    );
    expect(screen.getByText("Latest Stories")).toBeInTheDocument();
    const seeAllButton = screen.getByTestId("view-all");
    expect(seeAllButton).toBeInTheDocument();
    await userEvent.click(seeAllButton);
    await waitFor(async () => {
      expect(history.location.pathname).toBe(routers.STORY_LIST);
    });
  });

  it("test render item and navigate detail LatestStories", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LatestStories />
      </Router>
    );
    expect(screen.getAllByText("Cardano Academy").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Cardano Foundation Partners").length).toBeGreaterThan(0);
    expect(screen.getAllByText(moment("10/10/2022", "MM/DD/YYYY").format("MM/DD/YYYY")).length).toBeGreaterThan(0);

    const item = screen.getAllByText("Cardano Foundation Partners with Georgian National Wine Agency")[0];
    await userEvent.click(item);
    await waitFor(async () => {
      expect(history.location.pathname).toBe(details.story("1"));
    });
  });
});
