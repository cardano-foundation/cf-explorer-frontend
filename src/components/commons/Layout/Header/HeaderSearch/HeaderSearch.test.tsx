import { fireEvent, screen } from "@testing-library/react";
import HeaderSearch, { OptionsSearch } from ".";
import userEvent from "@testing-library/user-event";
import { render } from "src/test-utils";

describe("HeaderSearch", () => {
  it("should render header search", () => {
    render(<HeaderSearch home={false} />);
    expect(screen.getByPlaceholderText("Search ...")).toBeInTheDocument();
    expect(screen.getByText("Search for an epoch")).toBeInTheDocument();
  });
  it("should be able input for seaching", () => {
    render(<HeaderSearch home={false} />);
    const dropdown = screen.getByTestId("all-filters-dropdown");
    fireEvent.click(dropdown);
    const input = screen.getByPlaceholderText("Search ...");
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "testing value" } });
    expect(screen.getByText("testing value")).toBeInTheDocument();
  });

  it("should function search has been called", async () => {
    const mockHandleSearch = jest.fn();
    render(<OptionsSearch show={true} home={true} error="" value={"6789"} handleSearch={mockHandleSearch} />);
    const buttonSearch = screen.getByTestId("option-search-block");
    expect(buttonSearch).toBeInTheDocument();
    await userEvent.click(buttonSearch);
    expect(mockHandleSearch).toBeCalled();
  });
});
