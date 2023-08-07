import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen, waitFor } from "@testing-library/react";

import { render } from "src/test-utils";
import { signUp } from "src/commons/utils/userRequest";

import SignUp from ".";

const mockData = {
  email: "abcxyzabc@gmail.com",
  password: "123456Aabc@",
  type: 0
};

beforeEach(() => {
  render(<SignUp />);
});

jest.mock("src/commons/utils/userRequest", () => ({
  signUp: jest.fn()
}));

describe("SignUp page", () => {
  it("should render sign up page", () => {
    expect(screen.getByTestId("signup-title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
  });
  it("should able to type in email and password", () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(emailInput, { target: { value: mockData.email } });
    fireEvent.change(passwordInput, { target: { value: mockData.password } });
    expect(emailInput).toHaveValue(mockData.email);
    expect(passwordInput).toHaveValue(mockData.password);
  });

  it("should be able to click on create an account and call api", async () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    const confirmEmailInput = screen.getByPlaceholderText("Confirm email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm password");
    const check = screen.getByRole("checkbox", { name: /I agree to the Terms & Conditions and Privacy Policy/i });
    const signUpButton = screen.getByTestId("signup-button");
    fireEvent.change(emailInput, { target: { value: mockData.email } });
    fireEvent.change(confirmEmailInput, { target: { value: mockData.email } });
    fireEvent.change(passwordInput, { target: { value: mockData.password } });
    fireEvent.change(confirmPasswordInput, { target: { value: mockData.password } });
    fireEvent.click(check);
    fireEvent.click(signUpButton);
    await waitFor(async () => {
      expect(signUp).toHaveBeenCalledTimes(1);
    });
  });

  it("should be able to return error message for invalid email", async () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    fireEvent.change(emailInput, { target: { value: "test" } });
    const errorMessage = screen.getByText("Invalid Email");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should be able to return error message for invalid confirm email", async () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    const confirmEmailInput = screen.getByPlaceholderText("Confirm email address");
    fireEvent.change(emailInput, { target: { value: "abc@gmail.com" } });
    fireEvent.change(confirmEmailInput, { target: { value: "xyz@gmail.com" } });
    const errorMessage = screen.getByText("Email address does not match");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should be able to return error message for invalid password", async () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "abc" } });
    const errorMessage = screen.getByText(
      "Password has to be from 8 to 30 characters and must contain at least 1 number, 1 special character, 1 uppercase and 1 lowercase letter"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should be able to return error message for invalid confirm password", async () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm password");
    fireEvent.change(passwordInput, { target: { value: "abc" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "xyz" } });
    const errorMessage = screen.getByText("Password does not match");
    expect(errorMessage).toBeInTheDocument();
  });
});
