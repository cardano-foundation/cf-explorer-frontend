import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";

import CustomModal from ".";

const MockComponent = () => <span>Contents</span>;

describe("CustomModal component", () => {
  it("should component render", () => {
    render(
      <CustomModal open={true} onClose={jest.fn()}>
        <MockComponent />
      </CustomModal>
    );
    expect(screen.getByText(/contents/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should show component close", () => {
    const onClose = jest.fn();
    render(
      <CustomModal open={true} onClose={onClose}>
        <MockComponent />
      </CustomModal>
    );
    userEvent.click(screen.getByRole("button"));
    expect(onClose).toBeCalled();
  });
});
