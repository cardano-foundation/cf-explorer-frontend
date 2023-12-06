import { fireEvent, render, screen } from "src/test-utils";

import CIP60Badge, { TCIP60BadgeProps } from ".";

const fn = jest.fn();
const props: TCIP60BadgeProps = {
  type: "success",
  onClick: fn,
  tooltipTitle: "example tool tip"
};

describe("CIP60Badge", () => {
  it("should component with success element render", () => {
    render(<CIP60Badge {...props} />);
    expect(screen.getByText("CIP-60")).toBeInTheDocument();
    expect(screen.getByText(new RegExp("complied-cip25.svg", "i"))).toBeInTheDocument();
  });

  it("should component with warning element render", () => {
    render(<CIP60Badge {...props} type="warning" />);
    expect(screen.getByText("CIP-60")).toBeInTheDocument();
    expect(screen.getByText(new RegExp("cip60-warning.svg", "i"))).toBeInTheDocument();
  });

  it("should component with faalse element render", () => {
    render(<CIP60Badge {...props} type="warning" />);
    expect(screen.getByText("CIP-60")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("clickable-cip60-badge"));
    expect(fn).toBeCalled();
  });
});
