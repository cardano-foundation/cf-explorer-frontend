import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ReactRouter from "react-router";

import { render } from "src/test-utils";
import { details } from "src/commons/routers";

import ReportGeneratedTabs, { TabsItem } from ".";

const tabsItem: TabsItem[] = [
  { value: "stake-key", label: "This is tab 1", component: <div>This is component 1</div> },
  { value: "pools", label: "This is tab 2", component: <div>This is component 2</div> }
];

describe("ReportGeneratedTabs", () => {
  it("should render tabs", async () => {
    render(<ReportGeneratedTabs tabsItem={tabsItem} />);
    const element = screen.getByTestId("report-generated-tabs");
    expect(element).toBeInTheDocument();
    expect(screen.getByText("This is tab 1")).toBeInTheDocument();
    expect(screen.getByText("This is tab 2")).toBeInTheDocument();
  });

  it("should clickable when change tab", async () => {
    const history = createMemoryHistory();
    jest.spyOn(ReactRouter, "useParams").mockReturnValue({ tab: "stake-key" });
    render(
      <Router history={history}>
        <ReportGeneratedTabs tabsItem={tabsItem} />
      </Router>
    );
    const tab2 = screen.getByText("This is tab 2");
    await userEvent.click(tab2);
    waitFor(async () => {
      expect(history.location.pathname).toBe(details.generated_report("pools"));
      expect(screen.getByText("This is tab 2")).toHaveAttribute("active", "1");
      expect(screen.getByText("This is component 2")).toBeInTheDocument();
    });

    const tab1 = screen.getByText("This is tab 1");
    await userEvent.click(tab1);
    waitFor(async () => {
      expect(history.location.pathname).toBe(details.generated_report("stake-key"));
      expect(screen.getByText("This is component 1")).toBeInTheDocument();
    });
  });
});
