import { styled } from "@mui/material";

import HoldBox from "../HoldBox";

export const FeeBox = styled(HoldBox)(() => ({
  "::after": {
    content: '"FEES"'
  }
}));

FeeBox.displayName = "FeeBox";

export default FeeBox;
