import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FilterReport from "./index";

describe("FilterReport", () => {
  it("should render filter button", () => {
    render(<FilterReport />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("should render options when click button", async () => {
    render(<FilterReport />);
    const elm = screen.getByText("Filter");
    await userEvent.click(elm);
    expect(screen.getByText("Date range")).toBeInTheDocument();
    expect(screen.getByText("Latest - First")).toBeInTheDocument();
    expect(screen.getByText("First - Latest")).toBeInTheDocument();
    expect(screen.getByText("Search report name")).toBeInTheDocument();
  });

  it("should close options when click outside", async () => {
    render(<FilterReport />);
    const filterButton = screen.getByText("Filter");
    await userEvent.click(filterButton);

    await userEvent.click(document.body);
    expect(screen.queryByText("Date range")).toBeNull();
    expect(screen.queryByText("Latest - First")).toBeNull();
    expect(screen.queryByText("First - Latest")).toBeNull();
    expect(screen.queryByText("Search report name")).toBeNull();
  });
});
