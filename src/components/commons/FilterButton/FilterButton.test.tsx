import { fireEvent, render, screen } from "src/test-utils";

import FilterButton from ".";

const mockProps = {
  options: [
    { label: "Option 1", value: "option1", icon: "icon1.png" },
    { label: "Option 2", value: "option2", icon: "icon2.png" },
    { label: "Option 3", value: "option3", icon: "icon3.png" }
  ],
  defaultOption: { label: "Default Option", value: "default", icon: "default-icon.png" }
};

describe("FilterButton component", () => {
  it("should component render", () => {
    render(<FilterButton {...mockProps} />);
    expect(screen.getByRole("button", { name: /filter\.svg filter/i, hidden: true })).toBeInTheDocument();
    expect(screen.getByText(/filter\.svg/i)).toBeInTheDocument();
  });

  it("should component show the options", () => {
    render(<FilterButton {...mockProps} />);
    const filterButton = screen.getByRole("button", { name: /filter\.svg filter/i, hidden: true });
    fireEvent.click(filterButton);
    expect(screen.getByText(/option 1/i)).toBeInTheDocument();
    expect(screen.getByText(/option 2/i)).toBeInTheDocument();
    expect(screen.getByText(/option 3/i)).toBeInTheDocument();
  });
});
