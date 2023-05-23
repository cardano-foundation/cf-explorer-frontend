import { styled } from "@mui/material";
import HoldBox from "../HoldBox";

export const HoldBoxSPORed = styled(HoldBox)(() => ({
  "::after": {
    content: '"POOL HOLD"'
  }
}));

HoldBoxSPORed.displayName = "HoldBoxSPORed";

export default HoldBoxSPORed;
