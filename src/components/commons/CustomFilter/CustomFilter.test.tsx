import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "src/test-utils";

import CustomFilter from "./index";

describe("CustomFilter", () => {
  it("should render filter button", () => {
    const onChange = jest.fn();
    render(<CustomFilter onChange={onChange} searchLabel="Search report name" />);
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("should render options when click button", async () => {
    const onChange = jest.fn();
    render(<CustomFilter onChange={onChange} searchLabel="Search report name" />);

    const elm = screen.getByText("Filter");
    await userEvent.click(elm);
    expect(screen.getByText("Date range")).toBeInTheDocument();
    expect(screen.getByText("Latest - First")).toBeInTheDocument();
    expect(screen.getByText("First - Latest")).toBeInTheDocument();
    expect(screen.getByText("Search report name")).toBeInTheDocument();
  });
});
