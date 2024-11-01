import { render, screen } from "src/test-utils";

import CustomLayout from ".";

const MockComponent = () => <span>Contents</span>;
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
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
