import { useSelector } from "react-redux";

import { render, screen } from "src/test-utils";

import ToastContainer from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

const mockSuccess = {
  id: 1,
  severity: "success",
  message: "Toast message",
  duration: 3000
};

const mockError = {
  id: 1,
  severity: "error",
  message: "Toast message",
  duration: 3000
};

const mockWarning = {
  id: 1,
  severity: "warning",
  message: "Toast message",
  duration: 3000
};

describe("ToastContainer", () => {
  it("should component render successful alert", () => {
    (useSelector as jest.Mock).mockReturnValue({
      toasts: [mockSuccess]
    });
    render(<ToastContainer />);
    expect(screen.getByText(/successfully/i)).toBeInTheDocument();
    expect(screen.getByText(/toast message/i)).toBeInTheDocument();
  });

  it("should component render error alert", () => {
    (useSelector as jest.Mock).mockReturnValue({
      toasts: [mockError]
    });
    render(<ToastContainer />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/toast message/i)).toBeInTheDocument();
  });

  it("should component render warning alert", () => {
    (useSelector as jest.Mock).mockReturnValue({
      toasts: [mockWarning]
    });
    render(<ToastContainer />);
    expect(screen.getByText(/warning/i)).toBeInTheDocument();
    expect(screen.getByText(/toast message/i)).toBeInTheDocument();
  });
});
