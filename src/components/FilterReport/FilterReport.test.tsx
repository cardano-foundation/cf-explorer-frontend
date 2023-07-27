import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "src/test-utils";

import FilterReport from "./index";

describe("FilterReport", () => {
  it("should render filter button", () => {
    render(<FilterReport />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("should render options when click button", async () => {
    const onFilterValueChange = jest.fn();
    render(<FilterReport onFilterValueChange={onFilterValueChange} />);

    const elm = screen.getByText("Filter");
    await userEvent.click(elm);
    expect(screen.getByText("Date range")).toBeInTheDocument();
    expect(screen.getByText("Latest - First")).toBeInTheDocument();
    expect(screen.getByText("First - Latest")).toBeInTheDocument();
    expect(screen.getByText("Search report name")).toBeInTheDocument();
  });
});
