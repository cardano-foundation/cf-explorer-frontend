import { fireEvent, render, screen } from "src/test-utils";

import CIP25Badge, { TCIP25BadgeProps } from ".";
const fn = jest.fn();
const props: TCIP25BadgeProps = {
  type: "success",
  onClick: fn,
  tooltipTitle: "example tool tip"
};

describe("CIP25Badge", () => {
  it("should component with success element render", () => {
    render(<CIP25Badge {...props} />);
    expect(screen.getByText("CIP-25")).toBeInTheDocument();
    expect(screen.getByTestId("check-CIP")).toBeInTheDocument();
  });

  it("should component with false element render", () => {
    render(<CIP25Badge {...props} type="warning" />);
    expect(screen.getByText("CIP-25")).toBeInTheDocument();
  });

  it("should component with false element render", () => {
    render(<CIP25Badge {...props} type="warning" />);
    expect(screen.getByText("CIP-25")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("clickable-cip25-badge"));
    expect(fn).toBeCalled();
  });
});
