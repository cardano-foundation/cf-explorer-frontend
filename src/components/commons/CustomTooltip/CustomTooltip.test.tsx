import { render, screen } from "src/test-utils";

import CustomTooltip from ".";

const MockComponent = () => <button>Contents</button>;
const mockData = "section-when-user-click-outside";

describe("CustomTooltip component", () => {
  it("Compponent should render", () => {
    render(
      <CustomTooltip title={mockData}>
        <MockComponent />
      </CustomTooltip>
    );
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });
});
