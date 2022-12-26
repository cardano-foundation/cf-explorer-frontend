import { styled, Box } from "@mui/material";
import { CONFIRMATION_STATUS } from "../../../commons/utils/constants";

export const TitleCard = styled(Box)(({ theme }) => ({
  color: "rgba(0,0,0,0.5)",
  fontSize: "0.875rem",
}));
export const ConfirmStatus = styled("small")<{ status?: keyof typeof ConfirmationStatus }>`
  color: ${props => {
    switch (props.status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return props.theme.colorYellow;
      default:
        return props.theme.colorYellow;
    }
  }};
  background-color: ${props => {
    switch (props.status) {
      case CONFIRMATION_STATUS.MEDIUM:
        return `${props.theme.colorYellow}32`;
      default:
        return `${props.theme.colorYellow}32`;
    }
  }};
  margin-left: 10px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
`;
