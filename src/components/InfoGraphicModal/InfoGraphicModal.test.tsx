import { fireEvent, render, screen } from "src/test-utils";

import InfoGraphicModal from ".";

const mockProps = { onClose: jest.fn(), open: true };

describe("InfoGraphicModal component", () => {
  it("should component render", () => {
    render(<InfoGraphicModal {...mockProps} />);
    expect(screen.getByRole("img", { name: /info grapphic/i }));
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should component close", () => {
    render(<InfoGraphicModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockProps.onClose).toBeCalled();
  });
});
