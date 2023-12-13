import { fireEvent, render, screen } from "src/test-utils";

import DynamicEllipsisText from ".";

const mockValue = "eb77713692fb6a38f76a768cef58744b2b1c32b7ae029f6af6b8331c";
const postfix = 10;
document.execCommand = jest.fn();

describe("Dynimic Ellipsis Text test", () => {
  beforeEach(() => {
    render(<DynamicEllipsisText value={mockValue} isCopy isTooltip postfix={postfix} />);
  });

  it("should component render", () => {
    expect(screen.getByText(mockValue?.slice(0, mockValue?.length - postfix))).toBeInTheDocument();
    expect(screen.getByText(mockValue?.slice(-postfix))).toBeInTheDocument();
    expect(screen.getByTestId("copy-button")).toBeInTheDocument();
  });

  it("should copy to clipboard", () => {
    fireEvent.click(screen.getByTestId("copy-button"));
    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});
