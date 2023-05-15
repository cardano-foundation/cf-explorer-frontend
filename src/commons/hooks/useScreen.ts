import { useTheme } from '@mui/material';
import { useWindowSize } from 'react-use';

export const SAMSUNG_FOLD_SMALL_WIDTH = 280;
export const useScreen = () => {
  const theme = useTheme();
  const { width } = useWindowSize(0);

  const isMobile = width <= theme.breakpoints.values.sm;
  const isTablet = width <= theme.breakpoints.values.md;
  const isGalaxyFoldSmall = width <= SAMSUNG_FOLD_SMALL_WIDTH;
  return { isMobile, isTablet, isGalaxyFoldSmall };
};
