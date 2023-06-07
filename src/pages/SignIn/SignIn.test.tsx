import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "src/test-utils";
import SignIn from ".";

beforeEach(() => {
  render(<SignIn />);
})

describe("SignIn page", () => {
  it("should render the page and availble to use", () => {
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Log in")).toBeInTheDocument();
    expect(screen.getByTestId("connect-wallet")).toBeInTheDocument();
    expect(screen.getByTestId("forgot-password-link")).toBeInTheDocument();
  });
  it("should able to type in email and password", () => {
    const emailInput = screen.getByPlaceholderText("Email Address");
    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(emailInput, { target: { value: "abcxyz@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456A@" } });
    expect(emailInput).toHaveValue("abcxyz@gmail.com");
    expect(passwordInput).toHaveValue("123456A@");
  });
});
