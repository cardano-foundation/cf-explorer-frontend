import { styled } from "@mui/material";
import HoldBox from "../HoldBox";

export const HoldBoxSPO = styled(HoldBox)(({ theme }) => ({
  "::after": {
    content: '"POOL HOLD"',
    background: theme.palette.green[600]
  },
  border: `2px solid ${theme.palette.green[600]}`
}));

HoldBoxSPO.displayName = "HoldBoxSPO";

export default HoldBoxSPO;
