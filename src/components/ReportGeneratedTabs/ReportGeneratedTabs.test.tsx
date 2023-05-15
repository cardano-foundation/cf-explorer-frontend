import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReportGeneratedTabs, { TabsItem } from ".";

const tabsItem: TabsItem[] = [
  { value: "1", label: "This is tab 1", component: <div>This is component 1</div> },
  { value: "2", label: "This is tab 2", component: <div>This is component 2</div> },
];

describe("ReportGeneratedTabs", () => {
  it("should render tabs", async () => {
    render(<ReportGeneratedTabs tabsItem={tabsItem} />);
    const element = screen.getByTestId("report-generated-tabs");
    expect(element).toBeInTheDocument();
    expect(screen.getByText('This is tab 1')).toBeInTheDocument()
    expect(screen.getByText('This is tab 2')).toBeInTheDocument()
  });

  it("should clickable when change tab", async () => {
    render(<ReportGeneratedTabs tabsItem={tabsItem} />);
    const tab1 = screen.getByText('This is tab 1')
    await userEvent.click(tab1)
    expect(screen.getByText('This is component 1')).toBeInTheDocument();
    
    const tab2 = screen.getByText('This is tab 2')
    await userEvent.click(tab2)
    expect(screen.getByText('This is component 2')).toBeInTheDocument();
  });
});
