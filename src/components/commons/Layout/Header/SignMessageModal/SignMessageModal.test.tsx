import { fireEvent, render, screen } from "src/test-utils";

import SignMessageModal from ".";

const mockProps = {
  open: true,
  loadingSubmit: false,
  handleCloseModal: jest.fn(),
  onSignMessage: jest.fn(),
  disableSignButton: false
};

describe("SignMessageModal component", () => {
  it("should component render", () => {
    render(<SignMessageModal {...mockProps} />);
    const title = screen.getByText(/please click on sign button to allow access to your public key/i);
    expect(screen.getByRole("img", { name: /sign-message/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /signature required!/i })).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("should sign button click", () => {
    render(<SignMessageModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /sign/i }));
    expect(mockProps.onSignMessage).toBeCalled();
  });

  it("should modal close", () => {
    render(<SignMessageModal {...mockProps} />);
    const closeModalButton = screen.getByTestId("close-modal-button");
    expect(closeModalButton).toBeInTheDocument();
    fireEvent.click(closeModalButton);
    expect(mockProps.handleCloseModal).toBeCalled();
  });
});
