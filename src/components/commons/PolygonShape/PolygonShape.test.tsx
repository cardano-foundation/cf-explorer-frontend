import { render, screen } from "src/test-utils";

import PolygonShape from ".";

const MockComponent = () => <span>Contents</span>;

describe("PolygonShape component", () => {
  it("should component render", () => {
    render(
      <PolygonShape>
        <MockComponent />
      </PolygonShape>
    );
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });
});
