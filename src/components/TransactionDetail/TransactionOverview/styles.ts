import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { CONFIRMATION_STATUS } from "../../../commons/utils/constants";

export const TitleCard = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[300],
  fontSize: "0.875rem",
  minHeight: 20
}));

export const MaxSlot = styled("span")(({ theme }) => ({
  color: theme.palette.grey[300],
  fontWeight: "400"
}));

export const ConfirmStatus = styled("small")<{ status?: keyof typeof CONFIRMATION_STATUS }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.HIGH:
        return theme.palette.success.main;
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.palette.warning.main;
      default:
        return theme.palette.error.main;
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.HIGH:
        return theme.palette.success.light;
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.palette.warning.light;
      default:
        return theme.palette.error.light;
    }
  }};
  margin-left: 5px;
  text-wrap: nowrap;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;
export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;
