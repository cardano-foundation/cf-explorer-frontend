import { Box, Button, IconButton, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const CardOverview = styled(Box)`
  background: white;
  border-radius: 12px;
  height: 120px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.palette.secondary[0]};
  justify-content: space-between;
  padding: 0 25px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.03);
  & > svg {
    position: absolute;
    width: 127px;
    height: 120px;
    left: 0;
  }
`;

export const WrapIcon = styled(Box)(() => ({
  width: 95,
  marginRight: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start"
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: 16,
  whiteSpace: "nowrap",
  color: theme.palette.secondary.light,
  marginBottom: 4,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "16px"
  }
}));

export const CardValue = styled(Typography)<{ color?: string }>(({ theme, ...rest }) => ({
  whiteSpace: "break-spaces",
  textOverflow: "ellipsis",
  overflow: "hidden",
  fontWeight: theme.typography.fontWeightBold,
  fontSize: 24,
  color: rest.color ? rest.color : theme.palette.secondary.main,
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    lineHeight: "23px"
  }
}));

export const TransferButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: 14,
  fontWeight: theme.typography.fontWeightBold,
  padding: "0 16px",
  height: 38,
  borderRadius: 8,
  textTransform: "unset",
  boxShadow: "none"
}));

export const WrapWalletIcon = styled(Box)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: rgba(67, 143, 104, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 17px;
    height: 17px;
  }
`;

export const ClickAbleLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main + " !important",
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontWeight: "bold",
  fontSize: 24,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    lineHeight: "16px"
  }
}));

export const ViewMoreButton = styled(IconButton)`
  padding: 14px;
  background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[600] : theme.palette.border.primary)};
  &:hover {
    background-color: ${({ theme }) => (theme.isDark ? theme.palette.secondary[600] : theme.palette.border.primary)};
  }
`;

export const DotsIcon = styled(Box)`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  width: 3.6px;
  height: 3.6px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 3.6px;
    height: 3.6px;
    right: -7px;
    top: 0px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.secondary.light};
  }
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 3.6px;
    height: 3.6px;
    left: -7px;
    top: 0px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.secondary.light};
  }
`;

export const StyledBox = styled(Box)<{ hasAction?: boolean; sidebar?: boolean }>(({ hasAction, sidebar, theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  maxWidth: hasAction ? "calc(100% - 32px)" : "100%",
  [theme.breakpoints.down("lg")]: {
    maxWidth: hasAction ? (sidebar ? "85%" : "90%") : "100%"
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%"
  }
}));

export const WrapStatus = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  minWidth: 140
}));

export const WrapIconToStyle = styled(Box)(({ theme }) => ({
  color: theme.isDark ? theme.palette.secondary[800] : theme.palette.primary.iconBorder
}));
