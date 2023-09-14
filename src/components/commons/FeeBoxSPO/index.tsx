import { styled } from "@mui/material";
import i18next from "i18next";

import HoldBox from "../HoldBox";

export const FeeBoxSPO = styled(HoldBox)(({ theme }) => ({
  "::after": {
    content: `"${i18next.t("common.fees").toUpperCase()}"`
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
