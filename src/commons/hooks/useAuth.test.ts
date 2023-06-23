import { useSelector } from "react-redux";
import { renderHook } from "@testing-library/react";

import useAuth from "./useAuth";

jest.mock("react-redux", () => ({
  useSelector: jest.fn()
}));

describe("useAuth", () => {
  const testEmail = "testemail@gmail.com";
  const testAddress = "123 Main St";
  const testWallet = "0123abc";
  afterEach(() => {
    (useSelector as jest.Mock).mockReset();
  });

  it("when user login has email", () => {
    (useSelector as jest.Mock).mockReturnValue({ userData: { email: testEmail } });

    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoggedIn).toBe(testEmail);
  });

  it("when user login has address", () => {
    (useSelector as jest.Mock).mockReturnValue({ userData: { address: testAddress } });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(testAddress);
  });

  it("when user login has wallet ", () => {
    (useSelector as jest.Mock).mockReturnValue({ userData: { wallet: testWallet } });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(testWallet);
  });

  it("when user loggin has userData is empty", () => {
    (useSelector as jest.Mock).mockReturnValue({ userData: {} });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(undefined);
  });
});
