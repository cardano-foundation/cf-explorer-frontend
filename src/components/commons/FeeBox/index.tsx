import { styled } from "@mui/material";
import { t } from "i18next";

import HoldBox from "../HoldBox";

export const FeeBox = styled(HoldBox)(() => ({
  "::after": {
    content: `"${t("common.fees").toUpperCase()}"`
  }
}));

FeeBox.displayName = "FeeBox";

export default FeeBox;
