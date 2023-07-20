import { render, screen } from "src/test-utils";

import ProgressCircle, { Props } from ".";

const mockProps: Props = {
  percent: 75,
  size: 200,
  width: 10,
  pathWidth: 8,
  pathLineCap: "round",
  trailWidth: 6,
  trailOpacity: 0.5,
  strokeColor: "#FF0000"
};

describe("ProgressCircle component", () => {
  it("should component render", () => {
    render(<ProgressCircle {...mockProps}>Contents</ProgressCircle>);
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });
});
