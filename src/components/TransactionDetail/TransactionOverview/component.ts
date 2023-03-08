import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { CONFIRMATION_STATUS } from "../../../commons/utils/constants";

export const TitleCard = styled(Box)(({ theme }) => ({
  color: theme.black_50,
  fontSize: "0.875rem",
  minHeight: 20,
}));
export const ConfirmStatus = styled("small")<{ status?: keyof typeof ConfirmationStatus }>`
  color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return theme.warning_1;
      default:
        return theme.warning_1;
    }
  }};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return `${theme.warning_1_20}`;
      default:
        return `${theme.warning_1_20}`;
    }
  }};
  margin-left: 10px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;
export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.linkColor} !important;
`;
