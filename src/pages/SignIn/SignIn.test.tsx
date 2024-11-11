import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/react";

import { render } from "src/test-utils";
import { signIn } from "src/commons/utils/userRequest";

import SignIn from ".";

beforeEach(() => {
  render(<SignIn />);
});

jest.mock("src/commons/utils/userRequest", () => ({
  signIn: jest.fn()
}));

describe("SignIn page", () => {
  it("should render the page and availble to use", () => {
    expect(screen.getByTestId("signin-title")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByTestId("login-btn")).toBeInTheDocument();
    expect(screen.getByTestId("connect-wallet")).toBeInTheDocument();
    expect(screen.getByTestId("forgot-password-link")).toBeInTheDocument();
  });
  it("should able to type in email and password", () => {
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(emailInput, { target: { value: "abcxyz@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456A@" } });
    expect(emailInput).toHaveValue("abcxyz@gmail.com");
    expect(passwordInput).toHaveValue("123456A@");
  });

  it("should be able to click on login and call api", async () => {
    const mockData = {
      email: "abcxyz@gmail.com",
      password: "123456A@",
      type: 0
    };
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(emailInput, { target: { value: mockData.email } });
    fireEvent.change(passwordInput, { target: { value: mockData.password } });
    const loginButton = screen.getByTestId("login-btn");
    fireEvent.click(loginButton);
    expect(signIn).toHaveBeenCalled();
  });
});
