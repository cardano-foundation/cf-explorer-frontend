import { styled } from "@mui/material";

import HoldBox from "../HoldBox";

export const HoldBoxSPO = styled(HoldBox)<{ sidebar: boolean }>(({ theme, sidebar }) => ({
  "::after": {
    content: '"POOL HOLD"',
    background: theme.palette.green[600]
  },
  border: `2px solid ${theme.palette.green[600]}`,
  [theme.breakpoints.down(sidebar ? "xl" : "lg")]: {
    width: 151
  },
  [theme.breakpoints.down("sm")]: {
    width: 126
  }
}));

HoldBoxSPO.displayName = "HoldBoxSPO";

export default HoldBoxSPO;
