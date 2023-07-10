import userEvent from "@testing-library/user-event";

import { act, render, screen } from "src/test-utils";
import { getShortWallet } from "src/commons/utils/helper";

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
      expect(screen.getByText(getShortWallet(item))).toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { name: /dropdown title/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /icon close/i })).toBeInTheDocument();
  });

  it("should component close", () => {
    render(<DropdownDetail {...mockProps} />);
    act(() => {
      userEvent.click(screen.getByRole("button", { name: /icon close/i }));
    });
    expect(mockProps.close).toBeCalled();
  });
});
