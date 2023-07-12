import { fireEvent, screen } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";

import VerifyScriptModal from "./VerifyScriptModal";

describe("VerifyScriptModal", () => {
  const handleCloseModal = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    render(
      <VerifyScriptModal
        open={true}
        handleCloseModal={handleCloseModal}
        onSubmit={onSubmit}
        error={undefined}
        loading={false}
      />
    );
  });

  it("renders the modal title", () => {
    const elm = screen.getAllByText("Verify Script")[0] as HTMLAnchorElement;
    expect(elm).toBeInTheDocument();
  });

  it("renders the textarea", () => {
    const textArea = screen.getByPlaceholderText("Input Native script") as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: "Test script" } });
    expect(textArea.value).toBe("Test script");
  });

  it("renders the verify button", () => {
    const submitButton = screen.getAllByText("Verify Script")[1] as HTMLAnchorElement;
    expect(submitButton).toBeInTheDocument();
  });

  it("calls onSubmit when the verify button is clicked", () => {
    const script = "test script";
    fireEvent.change(screen.getByPlaceholderText("Input Native script"), {
      target: { value: script }
    });
    const submitButton = screen.getAllByText("Verify Script")[1] as HTMLAnchorElement;
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledWith(script);
  });

  it("calls handleCloseModal when the modal is closed", () => {
    fireEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });
});
