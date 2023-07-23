import { Box, styled, alpha, Tab } from "@mui/material";
import { TabPanel } from "@mui/lab";
import { Link } from "react-router-dom";

import { AdaLogoIcon } from "src/components/commons/ADAIcon";
import CustomModal from "src/components/commons/CustomModal";

export const StyledModal = styled(CustomModal)(() => ({}));

export const TabContainer = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.primary[200]}`
}));

export const TitleTab = styled(Box)<{ active: number }>(({ active, theme }) => ({
  fontWeight: "bold",
  textTransform: "capitalize",
  fontFamily: '"Roboto", sans-serif',
  fontSize: "1.125rem",
  color: active ? theme.palette.primary.main : theme.palette.secondary[600],
  paddingLeft: 8
}));

export const TabItem = styled(Box)(() => ({
  display: "flex",
  alignItems: "center"
}));

export const StyledTab = styled(Tab)(() => ({
  padding: "12px 0px",
  marginRight: 40
}));

export const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
  paddingTop: 12
}));

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
  color: theme.palette.secondary.main
}));

export const StyledAdaLogoIcon = styled(AdaLogoIcon)(() => ({
  fontSize: 12,
  lineHeight: "16px",
  marginLeft: 8
}));

export const StyledEmptyIcon = styled("img")(() => ({
  height: 215
}));

export const UpdateList = styled(ItemList)(() => ({}));

export const UpdateItem = styled(Item)(() => ({}));

export const HistoryList = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
  width: "100%"
}));

export const CardBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 3,
  flex: 1
}));
export const ChangeBox = styled(Box)(() => ({
  padding: "0px 30px",
  textAlign: "center"
}));

export const MinimumText = styled(Box)(({ theme }) => ({
  fontSize: 12,
  lineHeight: "16px",
  color: theme.palette.secondary.light,
  marginTop: 5
}));

export const SupperMinimumText = styled(MinimumText)(() => ({
  fontSize: 10,
  lineHeight: "12px"
}));

export const MinimumAdaLogoIcon = styled(StyledAdaLogoIcon)(({ theme }) => ({
  fontSize: 10,
  lineHeight: "12px",
  color: theme.palette.secondary.light,
  marginLeft: 5
}));
