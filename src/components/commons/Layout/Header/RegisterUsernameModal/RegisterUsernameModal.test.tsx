import { fireEvent, render, screen } from "src/test-utils";

import RegisterUsernameModal, { IProps } from ".";

const mockProps: IProps = {
  nonce: {
    message: "SS_0",
    nonce: "nonce123",
    userId: 123,
    walletId: 456
  },
  signature: "signature123",
  open: true,
  setIsSign: jest.fn()
};
describe("RegisterUsernameModal component", () => {
  it("should component render", () => {
    render(<RegisterUsernameModal {...mockProps} />);
    expect(screen.getByRole("heading", { name: /enter your username/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /confirm/i })).toBeInTheDocument();
  });

  it("should component summit the form", () => {
    render(<RegisterUsernameModal {...mockProps} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "newusername" } });
    expect(screen.getByRole("button", { name: /confirm/i })).not.toHaveAttribute("disable");
  });
});
