import { render, screen } from "src/test-utils";

import Home from ".";

describe("Home page", () => {
  it("should component render", () => {
    render(<Home />);
    const home = screen.getByTestId("home-container");
    expect(home.children.length).toBe(5);
  });
});
