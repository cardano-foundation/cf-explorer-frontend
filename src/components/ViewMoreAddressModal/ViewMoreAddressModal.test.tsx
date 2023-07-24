import { fireEvent, render, screen } from "src/test-utils";

import ViewMoreAddressModal from ".";

const mockProps = {
  title: "Modal Title",
  items: ["Address 1", "Address 2", "Address 3"],
  open: true,
  onClose: jest.fn(),
  onItemClick: jest.fn(),
  showFullHash: true,
  maxWidth: 600
};

describe("ViewMoreAddressModal component", () => {
  it("should component render", () => {
    render(<ViewMoreAddressModal {...mockProps} />);
    expect(screen.getByTestId("close-modal-button")).toBeInTheDocument();
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    mockProps.items.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should item click", () => {
    const onItemClick = jest.fn();
    render(<ViewMoreAddressModal {...mockProps} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByText(mockProps.items[0]));
    expect(onItemClick).toBeCalledWith(mockProps.items[0]);
  });

  it("should modal close", () => {
    const onClose = jest.fn();
    render(<ViewMoreAddressModal {...mockProps} onClose={onClose} />);
    fireEvent.click(screen.getByTestId("close-modal-button"));
    expect(onClose).toBeCalled();
  });
});
