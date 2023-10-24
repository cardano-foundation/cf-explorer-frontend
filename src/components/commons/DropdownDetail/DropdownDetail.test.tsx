import userEvent from "@testing-library/user-event";

import { act, render, screen } from "src/test-utils";
import { getShortHash } from "src/commons/utils/helper";

import DropdownDetail from ".";

const mockProps = {
  title: "Dropdown Title",
  value: ["Value 1", "Value 2", "Value 3"],
  close: jest.fn(),
  minWidth: "200px",
  isStakeDetail: true
};

describe("DropdownDetail component", () => {
  it("should component render", () => {
    render(<DropdownDetail {...mockProps} />);
    mockProps.value.forEach((item) => {
      expect(screen.getByText(getShortHash(item))).toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { name: /dropdown title/i })).toBeInTheDocument();
    expect(screen.getByTestId(/icon-close/i)).toBeInTheDocument();
  });

  it("should component close", () => {
    render(<DropdownDetail {...mockProps} />);
    act(() => {
      userEvent.click(screen.getByTestId(/icon-close/i));
    });
    expect(mockProps.close).toBeCalled();
  });
});
