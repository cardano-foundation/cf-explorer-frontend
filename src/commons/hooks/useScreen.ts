import { useTheme } from "@mui/material";
import { useWindowSize } from "react-use";

export const useScreen = () => {
  const theme = useTheme();
  const { width } = useWindowSize(0);

  const isMobile = width < theme.breakpoints.values.sm;
  const isTablet = width < theme.breakpoints.values.md;

  return { isMobile, isTablet };
};
