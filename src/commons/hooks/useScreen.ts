import { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

export const SAMSUNG_FOLD_SMALL_WIDTH = 355;
export const IPAD_PRO = 1270;

export const useScreen = () => {
  const { sidebar } = useSelector(({ user }: RootState) => user);
  const theme = useTheme();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const responsive = () => setWidth(window.innerWidth);

    window.addEventListener("resize", responsive);
    window.addEventListener("orientationchange", responsive);

    return () => {
      window.removeEventListener("resize", responsive);
      window.removeEventListener("orientationchange", responsive);
    };
  }, []);

  const { sm, md, lg, xl } = theme.breakpoints.values;
  const isMobile = width < sm;
  const isTablet = width < md;
  const isLaptop = width < lg;
  const isSmallScreen = (width < lg && sidebar) || isTablet;
  const isGalaxyFoldSmall = width <= SAMSUNG_FOLD_SMALL_WIDTH;
  const isLargeTablet = width <= IPAD_PRO;
  const isLanrgeScreen = width <= xl;
  return { isMobile, isTablet, isLaptop, isGalaxyFoldSmall, isLargeTablet, isSmallScreen, width, isLanrgeScreen };
};
