import { renderHook } from "@testing-library/react";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import { useScreen } from "./useScreen";

jest.mock("@mui/material", () => ({
  useTheme: jest.fn()
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn()
}));

describe("useScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct screen properties", () => {
    const theme = { breakpoints: { values: { sm: 600, md: 900, lg: 1200, xl: 1536 } } };
    const width = 700;
    global.innerWidth = width;
    (useTheme as jest.Mock).mockReturnValue(theme);
    (useSelector as jest.Mock).mockReturnValue({ sidebar: false });

    const { result } = renderHook(() => useScreen());
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isLaptop).toBe(true);
    expect(result.current.isGalaxyFoldSmall).toBe(false);
    expect(result.current.isLargeTablet).toBe(true);
    expect(result.current.isSmallScreen).toBe(true);
    expect(result.current.width).toBe(width);
  });
});
