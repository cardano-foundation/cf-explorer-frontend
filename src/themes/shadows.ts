import { alpha } from "@mui/material";

import { ThemeType } from "../types/user";
import palette from "./palette";

export const createShadow = (color: string) => {
  return {
    card: `0px 10px 25px ${alpha(color, 0.03)}`,
    dialog: `0px 2px 1px -1px ${alpha(color, 0.2)}, 0px 1px 1px ${alpha(color, 0.14)}, 0px 1px 3px ${alpha(
      color,
      0.12
    )}`,
    dropdown: `0px 4px 30px ${alpha(color, 0.1)}`,
    draw: `0px 1px 20px ${alpha(color, 0.05)}`,
    detailHeader: `0px 4px 50px ${alpha(color, 0.05)}`,
    rightDraw: `5px 10px 15px ${alpha(color, 0.5)}`
  };
};

const shadows: { [key in ThemeType]: ReturnType<typeof createShadow> } = {
  light: createShadow(palette.light.common.black),
  dark: createShadow(palette.light.common.white)
};

export default shadows;
