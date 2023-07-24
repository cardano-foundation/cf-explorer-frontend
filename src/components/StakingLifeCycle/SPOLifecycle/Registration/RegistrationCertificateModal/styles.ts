import { Box, styled, alpha } from "@mui/material";
import { Link } from "react-router-dom";

import CustomModal from "src/components/commons/CustomModal";
import { AdaLogoIcon } from "src/components/commons/ADAIcon";

export const StyledModal = styled(CustomModal)(() => ({}));

export const ItemList = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "5px 15px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  width: 475,
  [theme.breakpoints.down("sm")]: {
    width: "100%"
  }
}));

export const Item = styled(Box)(({ theme, flexDirection }) => ({
  backgroundColor: alpha(theme.palette.secondary.light, 0.1),
  padding: 20,
  flex: 1,
  display: "flex",
  flexDirection: typeof flexDirection === "string" ? flexDirection : "column",
  justifyContent: flexDirection === "row" ? "space-between" : "flex-start",
  alignItems: flexDirection === "row" ? "center" : "flex-start",
  minWidth: "calc(50% - 8px)",
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    padding: "15px 20px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: 15,
    paddingRight: flexDirection === "row" ? 5 : 15
  }
}));

export const Label = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: "16px",
  color: theme.palette.secondary.light,
  marginBottom: 8
}));

export const LineData = styled(Box)(() => ({
  marginBottom: 8,
  ":last-of-type": {
    marginBottom: 0
  }
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "22px",
  color: `${theme.palette.primary.main} !important`,
  wordBreak: "break-all",
  fontWeight: 500,
  marginRight: 5,
  [theme.breakpoints.down("sm")]: {
    marginRight: 3
  }
}));

export const VRFKeyText = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "22px",
  color: theme.palette.primary.main,
  wordBreak: "break-all",
  fontWeight: 500,
  display: "inline",
  marginRight: 5,
  [theme.breakpoints.down("sm")]: {
    marginRight: 3
  }
}));

export const Value = styled(VRFKeyText)(({ theme }) => ({
  color: theme.palette.secondary.main,
  display: "flex",
  alignItems: "center",
  gap: 8
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(() => ({
  fontSize: 12,
  lineHeight: "16px",
  marginBottom: ".125rem"
}));
