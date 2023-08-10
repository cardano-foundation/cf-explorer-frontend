import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import { render } from "src/test-utils";
import { forgotPassword } from "src/commons/utils/userRequest";

import ForgotPassword from ".";

const mockData = {
  email: "abcxyz@gmail.com",
  type: 0
};

beforeEach(() => {
  render(<ForgotPassword />);
});

jest.mock("src/commons/utils/userRequest", () => ({
  forgotPassword: jest.fn()
}));

describe("Forgot password page", () => {
  it("should render the page and availble to use", () => {
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
  });
  it("should able to type in email", () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    fireEvent.change(emailInput, { target: { value: mockData.email } });
    expect(emailInput).toHaveValue(mockData.email);
  });

  it("should be able to click on button submit and call api", async () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    fireEvent.change(emailInput, { target: { value: mockData.email } });
    const submitButton = screen.getByText("Submit");
    act(() => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(forgotPassword).toHaveBeenCalled();
    });
  });

  it("should be able to return error message for invalid email", async () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    fireEvent.change(emailInput, { target: { value: "abc" } });
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Invalid Email");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should be able to return error message for empty email", async () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    fireEvent.change(emailInput, { target: { value: "abc" } });
    fireEvent.change(emailInput, { target: { value: "" } });
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Please enter your Email");
    expect(errorMessage).toBeInTheDocument();
  });
});
