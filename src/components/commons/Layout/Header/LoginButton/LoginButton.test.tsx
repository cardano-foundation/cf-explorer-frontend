import { useSelector } from "react-redux";

import { render, screen } from "src/test-utils";

import LoginButton from ".";

const mockUser = {
  avatar: "path/to/avatar.png",
  email: "user@example.com",
  address: "123 Street, City",
  wallet: "0xabcdef1234567890",
  username: "user123",
  sizeBookmark: 10,
  sizeNote: 5,
  lastLogin: "2023-07-03T12:34:56Z",
  loginType: "normal"
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

describe("LoginButton component", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockReturnValue({ userData: mockUser });
  });

  it("should component render", () => {
    render(<LoginButton />);
    expect(screen.getByRole("button", { name: /user/i })).toBeInTheDocument();
  });
});
