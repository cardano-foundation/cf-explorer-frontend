import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

import { CONFIRMATION_STATUS } from "../../../commons/utils/constants";

export const TitleCard = styled(Box)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "0.875rem",
  minHeight: 20
}));

export const MaxSlot = styled("span")(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontWeight: "400"
}));

export const ConfirmStatus = styled("small")<{ status?: keyof typeof CONFIRMATION_STATUS }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.HIGH:
        return theme.palette.success[800];
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.palette.warning[800];
      default:
        return theme.palette.error[700];
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.HIGH:
        return theme.palette.success[100];
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.palette.warning[100];
      default:
        return theme.palette.error[100];
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
