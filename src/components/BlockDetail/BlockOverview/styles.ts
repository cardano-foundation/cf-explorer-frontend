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
  color: theme.palette.secondary.light,
  fontSize: "0.875rem"
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
  color: ${(props) => props.theme.palette.secondary.light};
  font-weight: normal;
  font-weight: 400;
`;
