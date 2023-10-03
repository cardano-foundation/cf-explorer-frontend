import { render, screen } from "src/test-utils";

import CustomLayout from ".";

const MockComponent = () => <span>Contents</span>;

describe("Layout component", () => {
  it("should component render", () => {
    render(
      <CustomLayout>
        <MockComponent />
      </CustomLayout>
    );
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });
});
