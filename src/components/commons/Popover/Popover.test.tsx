import { fireEvent, render, screen } from "src/test-utils";

import Popover from ".";

const MockButton = <span>Contents</span>;

describe("Popover component", () => {
  it("should component render", () => {
    render(<Popover content={MockButton} button={<button>Open</button>} />);
    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
  });

  it("should component display more contents", () => {
    render(<Popover content={MockButton} button={<button>Open</button>} />);
    fireEvent.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });
});
