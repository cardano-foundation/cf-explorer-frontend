import { render, screen } from "src/test-utils";

import Footer from ".";

describe("Footer component", () => {
  it("should component render", () => {
    render(<Footer />);
    const footerText = screen.getByTestId("footer-text");
    expect(footerText).toBeInTheDocument();
    expect(new RegExp(new Date().getFullYear().toString(), "i").test(footerText.innerHTML)).toBeTruthy();
  });
});
