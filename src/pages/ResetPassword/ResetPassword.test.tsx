import { fireEvent, render, screen, waitFor } from "src/test-utils";

import ResetPassword from ".";
jest.mock("src/commons/utils/axios", () => ({
  authAxios: {
    put: () => {
      return Promise.resolve({
        data: {
          code: "SS_0"
        }
      });
    },
    get: () => {
      return Promise.resolve({
        data: true
      });
    }
  }
}));

describe("ResetPassword page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should component render", async () => {
    render(<ResetPassword codeVerify="123123" />);
    await waitFor(() => {
      expect(screen.getByText(/reset password/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/new password/i)).toBeInTheDocument();
      expect(screen.getByText(/confirm new password/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });
  });

  it("should user submit the form", async () => {
    const password = "Admin@123456";
    render(<ResetPassword codeVerify="123123" />);
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText(/new password/i), { target: { value: password } });
      fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: password } });
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
    await waitFor(() => {
      expect(screen.getByText("Your password has been reset successfully")).toBeInTheDocument();
    });
  });

  it("should user submit invalid password", async () => {
    const invalidPassword = "123456";
    render(<ResetPassword codeVerify="123123" />);
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText(/new password/i), { target: { value: invalidPassword } });
      fireEvent.change(screen.getByPlaceholderText(/confirm password/i), { target: { value: invalidPassword } });
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    });
    await waitFor(() => {
      expect(screen.getByText(/password has to be from 8 to 30/i)).toBeInTheDocument();
    });
  });
});
