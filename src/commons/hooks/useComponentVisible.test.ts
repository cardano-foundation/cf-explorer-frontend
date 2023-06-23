import { renderHook, act } from "@testing-library/react";

import useComponentVisible from "./useComponentVisible";

describe("useComponentVisible", () => {
  it("should update component visibility using setIsComponentVisible", () => {
    const { result } = renderHook(() => useComponentVisible(true));

    act(() => {
      result.current.setIsComponentVisible(false);
    });

    expect(result.current.isComponentVisible).toBe(false);

    act(() => {
      result.current.setIsComponentVisible(true);
    });

    expect(result.current.isComponentVisible).toBe(true);
  });
});
