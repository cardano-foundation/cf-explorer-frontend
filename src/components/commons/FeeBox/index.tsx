import { styled } from "@mui/material";
import i18next from "i18next";

import HoldBox from "../HoldBox";

export const FeeBox = styled(HoldBox)(() => ({
  "::after": {
    content: `"${i18next.t("common.fees").toUpperCase()}"`
  }
}));

FeeBox.displayName = "FeeBox";

export default FeeBox;
