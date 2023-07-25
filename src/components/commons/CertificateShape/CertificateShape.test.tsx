import { render, screen } from "src/test-utils";

import CertificateShape from ".";

describe("CertificateShape component", () => {
  it("should component render", () => {
    render(<CertificateShape>Children's contents</CertificateShape>);
    expect(screen.getByText("Children's contents")).toBeInTheDocument();
  });
});
