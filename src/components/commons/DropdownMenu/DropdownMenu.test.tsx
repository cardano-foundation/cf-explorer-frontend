import { act, fireEvent, render, screen } from "src/test-utils";

import DropdownMenu from ".";

const mockProps = {
  title: "Dropdown Title",
  options: [{ label: "test 1", value: "test 1" }],
  handleSelect: jest.fn()
};

describe("DropdownMenu component", () => {
  it("should component render", () => {
    render(<DropdownMenu {...mockProps} />);
    expect(screen.getByText(/Dropdown Title/i)).toBeInTheDocument();
  });
  it("should component render", () => {
    render(<DropdownMenu {...mockProps} />);
    const menuButton = screen.getByTestId("dropdown-menu-button");
    act(async () => {
      fireEvent.click(menuButton);
      const option = screen.getByText(/test 1/i);
      await expect(option).toBeInTheDocument();
      await expect(mockProps.handleSelect).toBeCalled();
    });
  });
});
