import { styled } from "@mui/material";
import i18next from "i18next";

import HoldBox from "../HoldBox";

export const HoldBoxSPO = styled(HoldBox)(({ theme }) => ({
  "::after": {
    content: `"${i18next.t("glossary.poolHold").toUpperCase()}"`,
    background: theme.palette.success[800]
  },
  border: `2px solid ${theme.palette.primary[200]}`,
  [theme.breakpoints.down("lg")]: {
    width: 151
  },
  [theme.breakpoints.down("sm")]: {
    width: 126
  }
}));

HoldBoxSPO.displayName = "HoldBoxSPO";

export default HoldBoxSPO;
