import { renderHook } from "@testing-library/react";

import { addToast, removeToast } from "../../stores/toast";
import useToast from "./useToast";

jest.mock("../../stores/toast", () => ({
  addToast: jest.fn(),
  removeToast: jest.fn()
}));

describe("useToast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call addToast and removeToast with correct arguments", () => {
    const { result } = renderHook(() => useToast());

    result.current.error("Error message");
    expect(addToast).toHaveBeenCalledWith({
      id: expect.any(Number),
      severity: "error",
      message: "Error message",
      duration: 3000,
      title: true
    });
    setTimeout(() => {
      expect(removeToast).toHaveBeenCalledWith(expect.any(Number));
    });
  });
});
