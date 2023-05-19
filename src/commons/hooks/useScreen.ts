import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";

export const SAMSUNG_FOLD_SMALL_WIDTH = 355;
export const IPAD_PRO = 1270;
export const useScreen = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const theme = useTheme();
  const { width } = useWindowSize(0);

  const isMobile = width < theme.breakpoints.values.sm;
  const isTablet = width < theme.breakpoints.values.md;
  const isSmallScreen = (width < theme.breakpoints.values.lg && sidebar) || isTablet;
  const isGalaxyFoldSmall = width <= SAMSUNG_FOLD_SMALL_WIDTH;
  const isLargeTablet = width <= IPAD_PRO;
  return { isMobile, isTablet, isGalaxyFoldSmall, isLargeTablet, isSmallScreen, width };
};
