import { Box, styled } from "@mui/material";

import { CONFIRMATION_STATUS } from "src/commons/utils/constants";

export const Flex = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled("span")`
  font-family: var(--font-family-text) !important;
  color: ${(props) => props.theme.palette.secondary.main} !important;
`;

export const StyledSpan = styled("span")`
  display: flex;
  align-items: center;
`;

export const StyledImage = styled("img")`
  margin-left: 10px;
`;
export const TitleCard = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[300],
  fontSize: "0.875rem"
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
  margin-left: 6px;
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 2px;
  text-wrap: nowrap;
`;

export const WrapConfirmation = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingTop: "5px"
  }
}));

export const Subtext = styled("span")`
  opacity: 0.5;
  font-weight: 400;
`;
