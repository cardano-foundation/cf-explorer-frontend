import { fireEvent, render } from "src/test-utils";

import DelegationDraw from "./index";

describe("DelegationDraw", () => {
  it("should render the component", () => {
    const { getByText } = render(<DelegationDraw toggleCertificateModal={jest.fn()} />);
    expect(getByText("Delegation Certificate")).toBeInTheDocument();
  });

  it("should call the toggleCertificateModal function when the certificate shape is clicked", () => {
    const mockToggleCertificateModal = jest.fn();
    const { getByText } = render(<DelegationDraw toggleCertificateModal={mockToggleCertificateModal} />);
    const certificateShape = getByText("Delegation Certificate");
    fireEvent.click(certificateShape);

    expect(mockToggleCertificateModal).toHaveBeenCalled();
  });
});
