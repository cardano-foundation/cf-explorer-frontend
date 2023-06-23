import { render, screen, fireEvent } from "src/test-utils";

import DeregistrationDraw from "./index";

describe("DeregistrationDraw", () => {
  it("renders without errors", () => {
    render(<DeregistrationDraw toggleCertificateModal={jest.fn()} />);
    expect(screen.getByTestId("deregistration-draw")).toBeInTheDocument();
  });

  it("displays Deregistration Certificate shape", () => {
    render(<DeregistrationDraw toggleCertificateModal={jest.fn()} />);
    expect(screen.getByText("Deregistration Certificate")).toBeInTheDocument();
  });

  it("calls toggleCertificateModal when Deregistration Certificate shape is clicked", () => {
    const toggleCertificateModal = jest.fn();
    render(<DeregistrationDraw toggleCertificateModal={toggleCertificateModal} />);
    fireEvent.click(screen.getByText("Deregistration Certificate"));
    expect(toggleCertificateModal).toHaveBeenCalled();
  });

  it("displays the value of deposit and txHash in WithHoldBox component", () => {
    const data = {
      deposit: 500,
      txHash: "abc123",
      fee: 12,
      time: "12/12/2022 08:00:00"
    };
    render(<DeregistrationDraw data={data} toggleCertificateModal={jest.fn()} />);
    expect(screen.getByText("0.000012")).toBeInTheDocument();
  });
});
