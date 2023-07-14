import { fireEvent, render, screen } from "src/test-utils";

import StyledModal from ".";

const MockComponent = () => <span>Contents</span>;

describe("StyledModal component", () => {
  it("should component render", () => {
    render(
      <StyledModal open={true} handleCloseModal={jest.fn()}>
        <MockComponent />
      </StyledModal>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
  });

  it("should component close", () => {
    const onClose = jest.fn();
    render(
      <StyledModal open={true} handleCloseModal={onClose}>
        <MockComponent />
      </StyledModal>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClose).toBeCalled();
  });
});
