import { styled } from "@mui/material";
import { t } from "i18next";

import HoldBox from "../HoldBox";

export const FeeBoxSPO = styled(HoldBox)(({ theme }) => ({
  "::after": {
    content: `"${t("common.fees").toUpperCase()}"`
  },
  [theme.breakpoints.down("lg")]: {
    width: 151
  },
  [theme.breakpoints.down("sm")]: {
    width: 126
  }
}));

FeeBoxSPO.displayName = "FeeBoxSPO";

export default FeeBoxSPO;
