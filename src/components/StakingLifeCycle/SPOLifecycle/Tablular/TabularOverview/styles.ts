import { Box, Button, IconButton, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const CardOverview = styled(Box)`
  background: white;
  border-radius: 12px;
  height: 120px;
  display: flex;
  align-items: center;
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
  fontSize: 14,
  color: theme.palette.grey[400],
  marginBottom: 4
}));

export const CardValue = styled(Typography)<{ color?: string }>(({ theme, ...rest }) => ({
  overflowWrap: "anywhere",
  whiteSpace: "break-spaces",
  fontWeight: theme.typography.fontWeightBold,
  fontSize: 16,
  color: rest.color ? rest.color : theme.palette.grey[700]
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

export const ClickAbleLink = styled(Link)`
  color: ${({ theme }) => theme.palette.blue[800]} !important;
  cursor: pointer;
  white-space: nowrap;
`;

export const ViewMoreButton = styled(IconButton)`
  padding: 14px;
  background-color: #e3e5e9;
`;

export const DotsIcon = styled(Box)`
  border-radius: 50%;
  background-color: #667085;
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
    background-color: #667085;
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
    background-color: #667085;
  }
`;

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "12px"
}));

export const WrapStatus = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  minWidth: 140
}));
